import crypto from 'crypto';
import { PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { requireAdmin } from '../common/auth.mjs';
import { ddb } from '../common/dynamo.mjs';
import { json, parseBody } from '../common/response.mjs';

function normalizeCardId(rawId = '') {
  return String(rawId).trim().toUpperCase();
}

function makeTransactionKey(timestamp, transactionId) {
  return `${timestamp}#${transactionId}`;
}

export const handler = async (event) => {
  let claims;
  try {
    claims = await requireAdmin(event);
  } catch {
    return json(401, { message: 'Unauthorized.' });
  }

  const cardId = normalizeCardId(event?.pathParameters?.id);
  if (!cardId) {
    return json(400, { message: 'Card ID is required.' });
  }

  const body = parseBody(event);
  const type = body.type;
  const amountCents = Number(body.amountCents);
  const note = body.note ? String(body.note).slice(0, 256) : undefined;

  if (!['add', 'subtract'].includes(type)) {
    return json(400, { message: 'type must be add or subtract.' });
  }

  if (!Number.isInteger(amountCents) || amountCents <= 0) {
    return json(400, { message: 'amountCents must be a positive integer.' });
  }

  const cardsTable = process.env.GIFT_CARDS_TABLE;
  const txTable = process.env.GIFT_CARD_TRANSACTIONS_TABLE;

  const now = new Date().toISOString();
  const statusAllowedCondition = '(attribute_not_exists(#status) OR (#status <> :voidStatus AND #status <> :redeemedStatus))';
  const baseUpdate = 'SET updatedAt = :now, createdAt = if_not_exists(createdAt, :now), #status = if_not_exists(#status, :activeStatus), balanceCents = if_not_exists(balanceCents, :zero)';

  let nextCard;
  try {
    if (type === 'add') {
      const updateResult = await ddb.send(
        new UpdateCommand({
          TableName: cardsTable,
          Key: { cardId },
          UpdateExpression: `${baseUpdate} + :delta`,
          ConditionExpression: statusAllowedCondition,
          ExpressionAttributeNames: {
            '#status': 'status'
          },
          ExpressionAttributeValues: {
            ':now': now,
            ':zero': 0,
            ':delta': amountCents,
            ':activeStatus': 'active',
            ':voidStatus': 'void',
            ':redeemedStatus': 'redeemed'
          },
          ReturnValues: 'ALL_NEW'
        })
      );
      nextCard = updateResult.Attributes;
    } else {
      const updateResult = await ddb.send(
        new UpdateCommand({
          TableName: cardsTable,
          Key: { cardId },
          UpdateExpression: `${baseUpdate} - :delta`,
          ConditionExpression: `${statusAllowedCondition} AND if_not_exists(balanceCents, :zero) >= :delta`,
          ExpressionAttributeNames: {
            '#status': 'status'
          },
          ExpressionAttributeValues: {
            ':now': now,
            ':zero': 0,
            ':delta': amountCents,
            ':activeStatus': 'active',
            ':voidStatus': 'void',
            ':redeemedStatus': 'redeemed'
          },
          ReturnValues: 'ALL_NEW'
        })
      );
      nextCard = updateResult.Attributes;
    }
  } catch (error) {
    if (error?.name === 'ConditionalCheckFailedException') {
      return json(409, { message: 'Card state prevents this transaction.' });
    }
    throw error;
  }

  const transactionId = crypto.randomUUID();
  const transactionKey = makeTransactionKey(now, transactionId);

  await ddb.send(
    new PutCommand({
      TableName: txTable,
      Item: {
        cardId,
        transactionKey,
        transactionId,
        createdAt: now,
        type,
        amountCents,
        actor: claims.role || 'admin',
        note
      }
    })
  );

  const txResult = await ddb.send(
    new QueryCommand({
      TableName: txTable,
      KeyConditionExpression: 'cardId = :cardId',
      ExpressionAttributeValues: {
        ':cardId': cardId
      },
      ScanIndexForward: false,
      Limit: 50
    })
  );

  return json(200, {
    card: nextCard,
    transactions: txResult.Items || []
  });
};

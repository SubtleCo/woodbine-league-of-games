import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { requireAdmin } from '../common/auth.mjs';
import { ddb } from '../common/dynamo.mjs';
import { json, parseBody } from '../common/response.mjs';

const ALLOWED = new Set(['active', 'suspended', 'redeemed', 'void']);

function normalizeCardId(rawId = '') {
  return String(rawId).trim().toUpperCase();
}

export const handler = async (event) => {
  try {
    await requireAdmin(event);
  } catch {
    return json(401, { message: 'Unauthorized.' });
  }

  const cardId = normalizeCardId(event?.pathParameters?.id);
  if (!cardId) {
    return json(400, { message: 'Card ID is required.' });
  }

  const body = parseBody(event);
  const status = String(body.status || '').trim().toLowerCase();
  if (!ALLOWED.has(status)) {
    return json(400, { message: 'Invalid status value.' });
  }

  const cardsTable = process.env.GIFT_CARDS_TABLE;
  const txTable = process.env.GIFT_CARD_TRANSACTIONS_TABLE;

  const existing = await ddb.send(
    new GetCommand({
      TableName: cardsTable,
      Key: { cardId }
    })
  );

  const now = new Date().toISOString();
  const card = {
    cardId,
    status,
    balanceCents: Number(existing.Item?.balanceCents || 0),
    createdAt: existing.Item?.createdAt || now,
    updatedAt: now
  };

  await ddb.send(
    new PutCommand({
      TableName: cardsTable,
      Item: card
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
    card,
    transactions: txResult.Items || []
  });
};

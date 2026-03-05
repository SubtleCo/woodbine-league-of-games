import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { requireAdmin } from '../common/auth.mjs';
import { ddb } from '../common/dynamo.mjs';
import { json } from '../common/response.mjs';

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

  const cardsTable = process.env.GIFT_CARDS_TABLE;
  const txTable = process.env.GIFT_CARD_TRANSACTIONS_TABLE;

  let card = null;
  const existing = await ddb.send(
    new GetCommand({
      TableName: cardsTable,
      Key: { cardId }
    })
  );

  if (existing.Item) {
    card = existing.Item;
  } else {
    const now = new Date().toISOString();
    card = {
      cardId,
      status: 'active',
      balanceCents: 0,
      createdAt: now,
      updatedAt: now
    };

    await ddb.send(
      new PutCommand({
        TableName: cardsTable,
        Item: card,
        ConditionExpression: 'attribute_not_exists(cardId)'
      })
    );
  }

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

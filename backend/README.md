# Gift Card Admin API (AWS)

This backend provides:
- `POST /auth/login` for admin passcode login (JWT)
- `GET /gift-cards/{id}` for card status + balance + transaction history
- `POST /gift-cards/{id}/transactions` to add/subtract value
- `PATCH /gift-cards/{id}/status` to update card lifecycle status

## Stack
- API Gateway HTTP API
- Lambda (Node.js 20)
- DynamoDB

## Deploy with SAM

1. From `backend/`, install dependencies:

```bash
npm install
```

2. Create a Secrets Manager secret (once):

```bash
aws secretsmanager create-secret \
  --name wlog/gift-card-admin \
  --secret-string '{"ADMIN_PASSCODE":"<YOUR_PASSCODE>","JWT_SECRET":"<LONG_RANDOM_SECRET>"}'
```

Capture the returned `ARN` as `ADMIN_SECRET_ARN`.

3. Build and deploy:

```bash
sam build
sam deploy --guided --parameter-overrides AdminSecretArn=<ADMIN_SECRET_ARN>
```

4. During guided deploy:
- Set `AdminSecretArn` to your secret ARN
- Save args to `samconfig.toml`

5. Copy CloudFormation output `ApiBaseUrl` and set frontend env:

```bash
VITE_API_BASE_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com
```

## DynamoDB Tables
- `GiftCardsTable`
  - Partition key: `cardId` (string)
  - Attributes used: `status`, `balanceCents`, `createdAt`, `updatedAt`

- `GiftCardTransactionsTable`
  - Partition key: `cardId` (string)
  - Sort key: `transactionKey` (string, format `ISO_TIMESTAMP#UUID`)
  - Attributes used: `transactionId`, `type`, `amountCents`, `actor`, `note`, `createdAt`

## Notes
- Lambdas read `ADMIN_PASSCODE` and `JWT_SECRET` from Secrets Manager and cache values per execution environment.
- This is a simple JWT implementation for speed. For production hardening, consider Cognito or a custom authorizer.
- CORS is currently open (`*`) for bootstrap convenience.

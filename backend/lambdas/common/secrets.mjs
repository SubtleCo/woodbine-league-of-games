import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({});
let cachedSecrets = null;

function parseSecret(secretString) {
  try {
    const parsed = JSON.parse(secretString);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export async function getAdminSecrets() {
  if (cachedSecrets) {
    return cachedSecrets;
  }

  const secretArn = process.env.ADMIN_SECRET_ARN;
  if (!secretArn) {
    throw new Error('ADMIN_SECRET_ARN is not configured.');
  }

  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretArn
    })
  );

  const secretString = response.SecretString || '';
  const parsed = parseSecret(secretString);
  if (!parsed?.ADMIN_PASSCODE || !parsed?.JWT_SECRET) {
    throw new Error('Secret must include ADMIN_PASSCODE and JWT_SECRET.');
  }

  cachedSecrets = {
    ADMIN_PASSCODE: String(parsed.ADMIN_PASSCODE),
    JWT_SECRET: String(parsed.JWT_SECRET)
  };

  return cachedSecrets;
}

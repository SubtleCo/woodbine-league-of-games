import { signJwt } from '../common/jwt.mjs';
import { json, parseBody } from '../common/response.mjs';
import { getAdminSecrets } from '../common/secrets.mjs';

export const handler = async (event) => {
  const body = parseBody(event);
  const passcode = String(body.passcode || '').trim();

  if (!passcode) {
    return json(400, { message: 'Passcode is required.' });
  }

  let adminPasscode;
  let jwtSecret;
  try {
    const secrets = await getAdminSecrets();
    adminPasscode = secrets.ADMIN_PASSCODE;
    jwtSecret = secrets.JWT_SECRET;
  } catch {
    return json(500, { message: 'Admin secrets are not configured correctly.' });
  }

  if (!adminPasscode || passcode !== adminPasscode) {
    return json(401, { message: 'Invalid passcode.' });
  }

  const ttlSeconds = Number(process.env.JWT_TTL_SECONDS || 28800);
  const token = signJwt({ role: 'admin' }, jwtSecret, ttlSeconds);
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();

  return json(200, { token, expiresAt });
};

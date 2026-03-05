import { verifyJwt } from './jwt.mjs';
import { getAdminSecrets } from './secrets.mjs';

export async function requireAdmin(event) {
  const authHeader = event?.headers?.authorization || event?.headers?.Authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new Error('Missing bearer token.');
  }

  const { JWT_SECRET: secret } = await getAdminSecrets();

  return verifyJwt(token, secret);
}

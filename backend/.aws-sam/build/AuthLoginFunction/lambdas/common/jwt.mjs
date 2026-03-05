import crypto from 'crypto';

function base64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlJson(object) {
  return base64Url(JSON.stringify(object));
}

function decodeBase64Url(segment) {
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, 'base64').toString('utf-8');
}

function hmacSha256(input, secret) {
  const signature = crypto.createHmac('sha256', secret).update(input).digest('base64');
  return signature.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function signJwt(payload, secret, ttlSeconds) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + ttlSeconds
  };

  const headerSegment = base64UrlJson(header);
  const payloadSegment = base64UrlJson(tokenPayload);
  const signingInput = `${headerSegment}.${payloadSegment}`;
  const signature = hmacSha256(signingInput, secret);

  return `${signingInput}.${signature}`;
}

export function verifyJwt(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Malformed token.');
  }

  const [headerSegment, payloadSegment, signature] = parts;
  const signingInput = `${headerSegment}.${payloadSegment}`;
  const expected = hmacSha256(signingInput, secret);

  if (signature !== expected) {
    throw new Error('Bad signature.');
  }

  const payload = JSON.parse(decodeBase64Url(payloadSegment));
  if (!payload?.exp || Math.floor(Date.now() / 1000) >= payload.exp) {
    throw new Error('Token expired.');
  }

  return payload;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '');

function requireApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL.');
  }
  return API_BASE_URL;
}

async function apiRequest(path, { method = 'GET', token, body } = {}) {
  const baseUrl = requireApiBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || 'Request failed.');
  }

  return data;
}

export function isApiConfigured() {
  return Boolean(API_BASE_URL);
}

export async function loginAdmin(passcode) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { passcode }
  });
}

export async function fetchGiftCard(cardId, token) {
  return apiRequest(`/gift-cards/${encodeURIComponent(cardId)}`, { token });
}

export async function postGiftCardTransaction(cardId, payload, token) {
  return apiRequest(`/gift-cards/${encodeURIComponent(cardId)}/transactions`, {
    method: 'POST',
    token,
    body: payload
  });
}

export async function patchGiftCardStatus(cardId, status, token) {
  return apiRequest(`/gift-cards/${encodeURIComponent(cardId)}/status`, {
    method: 'PATCH',
    token,
    body: { status }
  });
}

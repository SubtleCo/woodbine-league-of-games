import { createContext, useContext, useMemo, useState } from 'react';
import { isApiConfigured, loginAdmin } from '../api/adminApi';

const AUTH_STORAGE_KEY = 'wlog-admin-auth-v2';
const LEGACY_PASSCODE = (import.meta.env.VITE_ADMIN_PASSCODE || 'woodbine-admin').trim();

const AdminAuthContext = createContext(null);

function readSession() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.token) {
      return null;
    }

    if (parsed.expiresAt && Date.now() >= new Date(parsed.expiresAt).getTime()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function persistSession(session) {
  if (!session) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(session?.token),
      token: session?.token || '',
      async login(passcode) {
        if (!passcode.trim()) {
          return { ok: false, message: 'Passcode required.' };
        }

        if (!isApiConfigured()) {
          if (passcode.trim() !== LEGACY_PASSCODE) {
            return { ok: false, message: 'Invalid passcode.' };
          }

          const offlineSession = {
            token: 'local-dev-token',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            mode: 'offline'
          };
          persistSession(offlineSession);
          setSession(offlineSession);
          return { ok: true };
        }

        try {
          const result = await loginAdmin(passcode);
          const nextSession = {
            token: result.token,
            expiresAt: result.expiresAt,
            mode: 'api'
          };
          persistSession(nextSession);
          setSession(nextSession);
          return { ok: true };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : 'Login failed.' };
        }
      },
      logout() {
        persistSession(null);
        setSession(null);
      }
    }),
    [session]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}

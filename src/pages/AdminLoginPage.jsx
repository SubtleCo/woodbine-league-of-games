import { useState } from 'react';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { isApiConfigured } from '../api/adminApi';
import { useAdminAuth } from '../auth/AdminAuthContext';

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAdminAuth();

  const redirectTo = searchParams.get('redirect') || '/admin/gift-card';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    const result = await login(passcode);

    setBusy(false);
    if (result.ok) {
      navigate(redirectTo, { replace: true });
      return;
    }

    setError(result.message || 'Login failed.');
  }

  return (
    <Box className="admin-page-wrap">
      <Paper className="admin-card" elevation={0}>
        <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '1.9rem', md: '2.3rem' }, mb: 1 }}>
          Admin Sign In
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Authenticate to access gift card management under `/admin`.
        </Typography>

        {!isApiConfigured() ? (
          <Alert severity="warning" sx={{ mb: 1.2 }}>
            API mode is not configured (`VITE_API_BASE_URL` missing). Using local fallback auth.
          </Alert>
        ) : null}

        <Stack component="form" onSubmit={handleSubmit} spacing={1.25}>
          <TextField
            label="Passcode"
            type="password"
            value={passcode}
            onChange={(event) => {
              setPasscode(event.target.value);
              if (error) {
                setError('');
              }
            }}
            autoFocus
            fullWidth
            required
          />
          {error ? <Alert severity="error">{error}</Alert> : null}
          <Button variant="contained" type="submit" disabled={busy}>
            {busy ? 'Signing in...' : 'Sign in'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

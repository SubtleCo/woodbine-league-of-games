import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import {
  fetchGiftCard,
  isApiConfigured,
  patchGiftCardStatus,
  postGiftCardTransaction
} from '../api/adminApi';
import { useAdminAuth } from '../auth/AdminAuthContext';

const CARD_STATUSES = ['active', 'suspended', 'redeemed', 'void'];

function normalizeCardId(rawId = '') {
  return rawId.trim().toUpperCase();
}

function centsToDollars(cents) {
  return (Number(cents || 0) / 100).toFixed(2);
}

export default function AdminGiftCardPage() {
  const { logout, token } = useAdminAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [lookupId, setLookupId] = useState(searchParams.get('id') || '');
  const [amountInput, setAmountInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [card, setCard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [statusDraft, setStatusDraft] = useState('active');

  const cardId = useMemo(() => normalizeCardId(searchParams.get('id') || ''), [searchParams]);

  useEffect(() => {
    setLookupId(cardId);
  }, [cardId]);

  useEffect(() => {
    async function loadCard() {
      if (!cardId) {
        setCard(null);
        setTransactions([]);
        return;
      }

      if (!isApiConfigured()) {
        setError('Missing VITE_API_BASE_URL. Configure API URL to load cards.');
        setCard(null);
        setTransactions([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const result = await fetchGiftCard(cardId, token);
        setCard(result.card);
        setStatusDraft(result.card?.status || 'active');
        setTransactions(result.transactions || []);
      } catch (loadError) {
        setCard(null);
        setTransactions([]);
        setError(loadError instanceof Error ? loadError.message : 'Could not load card.');
      } finally {
        setLoading(false);
      }
    }

    loadCard();
  }, [cardId, token]);

  function parseAmountInCents() {
    const parsed = Number(amountInput);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError('Enter a valid positive amount.');
      return null;
    }

    const cents = Math.round(parsed * 100);
    if (cents <= 0) {
      setError('Amount must be at least $0.01.');
      return null;
    }

    return cents;
  }

  async function handleTransaction(type) {
    if (!cardId || !card) {
      setError('Load a card first.');
      return;
    }

    const amountCents = parseAmountInCents();
    if (amountCents === null) {
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const result = await postGiftCardTransaction(
        cardId,
        {
          type,
          amountCents,
          note: noteInput.trim() || undefined
        },
        token
      );

      setCard(result.card);
      setTransactions(result.transactions || []);
      setAmountInput('');
      setNoteInput('');
    } catch (txError) {
      setError(txError instanceof Error ? txError.message : 'Transaction failed.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusSave() {
    if (!cardId || !card) {
      setError('Load a card first.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const result = await patchGiftCardStatus(cardId, statusDraft, token);
      setCard(result.card);
      setTransactions(result.transactions || transactions);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Could not update status.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleLookupSubmit(event) {
    event.preventDefault();
    const normalized = normalizeCardId(lookupId);

    if (!normalized) {
      setError('Enter a card ID.');
      return;
    }

    setSearchParams({ id: normalized });
  }

  return (
    <Box className="admin-page-wrap">
      <Paper className="admin-card" elevation={0}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1.25}>
          <Box>
            <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '1.8rem', md: '2.3rem' }, mb: 0.25 }}>
              Gift Card Admin
            </Typography>
            <Typography color="text.secondary">URL format: #/admin/gift-card?id=2DYM9W4H</Typography>
          </Box>
          <Button variant="outlined" color="secondary" onClick={logout}>
            Sign out
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack component="form" onSubmit={handleLookupSubmit} direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 2 }}>
          <TextField
            label="Gift Card ID"
            value={lookupId}
            onChange={(event) => setLookupId(event.target.value)}
            placeholder="2DYM9W4H"
            fullWidth
          />
          <Button type="submit" variant="outlined" disabled={loading}>
            Load card
          </Button>
        </Stack>

        {error ? <Alert severity="error" sx={{ mb: 1.25 }}>{error}</Alert> : null}

        {loading ? (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ py: 1 }}>
            <CircularProgress size={18} />
            <Typography>Loading card...</Typography>
          </Stack>
        ) : null}

        {!loading && card ? (
          <>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
              <Paper variant="outlined" sx={{ p: 1.1, flex: 1 }}>
                <Typography color="text.secondary" sx={{ mb: 0.2 }}>Card ID</Typography>
                <Typography sx={{ fontWeight: 700 }}>{card.cardId}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 1.1, flex: 1 }}>
                <Typography color="text.secondary" sx={{ mb: 0.2 }}>Balance</Typography>
                <Typography sx={{ fontWeight: 700 }}>${centsToDollars(card.balanceCents)}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 1.1, flex: 1 }}>
                <Typography color="text.secondary" sx={{ mb: 0.2 }}>Status</Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    select
                    size="small"
                    value={statusDraft}
                    onChange={(event) => setStatusDraft(event.target.value)}
                    sx={{ minWidth: 160 }}
                  >
                    {CARD_STATUSES.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                  <Button variant="outlined" onClick={handleStatusSave} disabled={submitting || statusDraft === card.status}>
                    Save
                  </Button>
                </Stack>
              </Paper>
            </Stack>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 0.75 }}>
              Add / subtract value
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mb: 2 }}>
              <TextField
                label="Amount (USD)"
                type="number"
                inputProps={{ min: '0.01', step: '0.01' }}
                value={amountInput}
                onChange={(event) => setAmountInput(event.target.value)}
                sx={{ minWidth: 180 }}
              />
              <TextField
                label="Note (optional)"
                value={noteInput}
                onChange={(event) => setNoteInput(event.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={() => handleTransaction('add')} disabled={submitting}>
                Add
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleTransaction('subtract')} disabled={submitting}>
                Subtract
              </Button>
            </Stack>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 0.75 }}>
              Transactions
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Actor</TableCell>
                    <TableCell>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5}>No transactions yet.</TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((entry) => (
                      <TableRow key={entry.transactionId}>
                        <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{entry.type}</TableCell>
                        <TableCell align="right">
                          {entry.type === 'subtract' ? '-' : '+'}${centsToDollars(entry.amountCents)}
                        </TableCell>
                        <TableCell>{entry.actor || 'admin'}</TableCell>
                        <TableCell>{entry.note || ''}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : null}
      </Paper>
    </Box>
  );
}

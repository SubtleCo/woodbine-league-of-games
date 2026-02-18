import { Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
        Page Not Found
      </Typography>

      <Typography color="text.secondary" paragraph>
        The page you requested does not exist.
      </Typography>

      <MuiLink component={RouterLink} to="/" underline="hover">
        Return to home
      </MuiLink>
    </>
  );
}

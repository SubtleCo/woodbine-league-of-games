import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';

/*
  Shared page shell for every route.
  Keeps the logo, nav, and footer consistent site-wide.
*/
export default function SiteLayout() {
  return (
    <Container maxWidth="lg" sx={{ pt: 2, pb: 5 }} className="site-shell">
      <Box component="header" mb={2} className="site-header">
        <Typography
          variant="h1"
          component="h1"
          textAlign="center"
          sx={{
            fontFamily: 'Fraunces, serif',
            fontSize: { xs: '2.6rem', md: '4rem' },
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          Woodbine League of Games
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          textAlign="center"
          sx={{
            fontFamily: 'Fraunces, serif',
            fontStyle: 'italic',
            fontSize: { xs: '1.1rem', md: '1.4rem' },
            color: 'text.secondary',
            pb: 1.5,
          }}
        >
          a little neighborhood game shop
        </Typography>
        <MainNav />
      </Box>

      <Box component="main">
        <Outlet />
      </Box>

      <Box component="footer" mt={5} textAlign="center" className="site-footer">
        <Typography variant="body2" color="text.secondary">
          Woodbine League of Games
        </Typography>
      </Box>
    </Container>
  );
}

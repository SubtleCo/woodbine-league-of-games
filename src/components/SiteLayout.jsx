import { Box, Container, Typography } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import MainNav from './MainNav';

/*
  Shared page shell for every route.
  Keeps the logo, nav, and footer consistent site-wide.
*/
export default function SiteLayout() {
  return (
    <Container maxWidth="lg" sx={{ pt: 2, pb: 5 }} className="site-shell">
      <Box component="header" textAlign="center" mb={2} className="site-header">
        <Box
          component={RouterLink}
          to="/"
          className="site-logo-link"
          aria-label="Go to homepage"
        >
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}photos/logo.png`}
            alt="Woodbine League of Games logo"
            className="logo-image"
          />
        </Box>
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

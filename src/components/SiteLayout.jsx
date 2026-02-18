import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';

/*
  Shared page shell for every route.
  Keeps the logo, nav, and footer consistent site-wide.
*/
export default function SiteLayout() {
  return (
    <Container maxWidth="lg" sx={{ pt: 2, pb: 5 }}>
      <Box component="header" textAlign="center" mb={2}>
        <Box
          component="img"
          src="/photos/logo.png"
          alt="Woodbine League of Games logo"
          className="logo-image"
        />
        <MainNav />
      </Box>

      <Box component="main">
        <Outlet />
      </Box>

      <Box component="footer" mt={5} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Woodbine League of Games
        </Typography>
      </Box>
    </Container>
  );
}

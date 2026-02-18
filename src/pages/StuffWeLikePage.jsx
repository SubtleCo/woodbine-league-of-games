import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StoreSidebar from '../components/StoreSidebar';
import { topLevelGames } from '../data/games';

/*
  Store landing page.
  It maps over the games data array so one update creates both list + detail pages.
*/
export default function StuffWeLikePage() {
  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        Stuff We Like
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        A growing shelf-by-shelf guide to the games carried by our store.
      </Typography>

      <Box className="store-layout">
        <StoreSidebar />

        <Box className="store-main-panel">
          {topLevelGames.map((game) => (
            <Box key={game.slug} className="store-row">
              <Typography variant="h3" sx={{ fontSize: '1.08rem', mb: 0.5 }}>
                {game.name}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                {game.shortDescription}
              </Typography>
              <Link component={RouterLink} to={`/stuffwelike/${game.slug}`} underline="hover">
                Open game page
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

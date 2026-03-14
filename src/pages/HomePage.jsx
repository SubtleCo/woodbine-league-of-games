import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PhotoCarousel from '../components/PhotoCarousel';

export default function HomePage() {
  return (
    <>
      {/* Condensed location + hours strip */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: { xs: 0.5, sm: 0 },
        alignItems: 'baseline',
        justifyContent: 'center',
        mb: 2,
        color: 'text.secondary',
      }}>
        <Typography variant="body2">Mon–Fri 9am–5pm &nbsp;·&nbsp; Sat Noon–5pm</Typography>
        <Typography variant="body2" sx={{ mx: { xs: 0, sm: '0.5rem' }, display: { xs: 'none', sm: 'inline' } }}>·</Typography>
        <Typography variant="body2">
          <a href="https://maps.google.com/?q=2601+Nolensville+Pk+Nashville+TN+37211" target="_blank" rel="noopener noreferrer">
            2601 Nolensville Pk, Nashville
          </a>
          {' '}·{' '}
          <a href="https://primitivecoffee.co" target="_blank" rel="noopener noreferrer">
            Inside Primitive Coffee
          </a>
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <PhotoCarousel slides={[
          { file: 'carousel/storefront.jpeg', alt: 'Woodbine League of Games storefront inside Primitive Coffee' },
          { file: 'carousel/Bristol.jpg', alt: 'Bristol board game' },
          { file: 'carousel/old_kings_crown.jpg', alt: 'Old King\'s Crown board game' },
          { file: 'carousel/root.jpg', alt: 'Root board game' },
          { file: 'carousel/tend.jpg', alt: 'Tend board game' },
        ]} />
      </Box>

      {/* Three pillars */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: { xs: 3, sm: 4 },
      }}>
        <Box>
          <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'Fraunces, serif', borderTop: '2px solid var(--accent-rust)', pt: 0.75, mb: 0.75 }}>
            Shop
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Hand-picked games we know and love. Browse, ask questions, take one home.
          </Typography>
          <RouterLink to="/stuffwelike">Browse the shelf →</RouterLink>
        </Box>

        <Box>
          <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'Fraunces, serif', borderTop: '2px solid var(--accent-rust)', pt: 0.75, mb: 0.75 }}>
            Play In-Store
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pull anything off our library shelf and play right here. No reservation needed — just show up.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'Fraunces, serif', borderTop: '2px solid var(--accent-rust)', pt: 0.75, mb: 0.75 }}>
            Gaming Community
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            We started as a gaming group and still are one. Regular events and a spot at the table for everyone.
          </Typography>
          <RouterLink to="/woodbinewednesdays">Woodbine Wednesdays →</RouterLink>
        </Box>
      </Box>
    </>
  );
}

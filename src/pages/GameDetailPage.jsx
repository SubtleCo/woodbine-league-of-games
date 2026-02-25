import { Box, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import StoreSidebar from '../components/StoreSidebar';
import { gameBySlug } from '../data/games';
import { photoUrl } from '../data/photos';

/*
  Dynamic detail page for any game slug.
  Example: /stuffwelike/moonrakers loads data for slug = "moonrakers".
*/
export default function GameDetailPage() {
  const { gameSlug } = useParams();
  const game = gameBySlug[gameSlug ?? ''];

  if (!game) {
    return (
      <>
        <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
          Game Not Found
        </Typography>

        <Typography paragraph color="text.secondary">
          We could not find a game page for slug: {gameSlug}
        </Typography>

        <MuiLink component={RouterLink} to="/stuffwelike" underline="hover">
          Back to Stuff We Like
        </MuiLink>
      </>
    );
  }

  return (
    <Box>
      <Typography variant="h1" component="h1" className="section-title" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        {game.name}
      </Typography>

      <Typography color="text.secondary" className="page-intro">
        {game.shortDescription}
      </Typography>

      <Box className="store-layout">
        <StoreSidebar currentSlug={game.slug} />

        <Box className="store-main-panel">
          <Box
            component="img"
            src={photoUrl(game.heroPhoto)}
            alt={`${game.name} feature image`}
            className="game-hero-image"
          />

          {game.detailParagraphs.map((paragraph) => (
            <Typography key={paragraph} paragraph>
              {paragraph}
            </Typography>
          ))}

        </Box>
      </Box>
    </Box>
  );
}

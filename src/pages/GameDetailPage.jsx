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
      <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        {game.name}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
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

          <Box className="game-stats-strip">
            <Typography component="span" className="game-stats-label">
              Quick Notes
            </Typography>
            <Typography component="span">{game.shortDescription}</Typography>
          </Box>

          {game.detailParagraphs.map((paragraph) => (
            <Typography key={paragraph} paragraph>
              {paragraph}
            </Typography>
          ))}

          <MuiLink component={RouterLink} to="/stuffwelike" underline="hover">
            Back to Stuff We Like
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
}

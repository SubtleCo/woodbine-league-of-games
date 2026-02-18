import { Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import StoryBlock from '../components/StoryBlock';
import { gameBySlug } from '../data/games';

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
    <>
      <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        {game.name}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {game.shortDescription}
      </Typography>

      <StoryBlock
        image={game.heroPhoto}
        imageAlt={`${game.name} feature image`}
        imageAlign="right"
        paragraphs={game.detailParagraphs}
      />

      <MuiLink component={RouterLink} to="/stuffwelike" underline="hover">
        Back to Stuff We Like
      </MuiLink>
    </>
  );
}

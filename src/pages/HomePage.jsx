import { Typography } from '@mui/material';
import PhotoCarousel from '../components/PhotoCarousel';
import { homeCarouselFiles } from '../data/photos';

export default function HomePage() {
  return (
    <>
      <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        Woodbine League of Games
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Your friendly neighborhood tabletop gaming group.
      </Typography>

      <PhotoCarousel files={homeCarouselFiles} />
    </>
  );
}

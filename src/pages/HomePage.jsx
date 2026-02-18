import { Typography } from '@mui/material';
import PhotoCarousel from '../components/PhotoCarousel';
import { photoFiles } from '../data/photos';

export default function HomePage() {
  return (
    <>
      <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        Woodbine League of Games
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        A place for game nights, new finds, and the weekly Wednesday rhythm.
      </Typography>

      <PhotoCarousel files={photoFiles} />
    </>
  );
}

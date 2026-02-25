import { Typography } from '@mui/material';
import PhotoCarousel from '../components/PhotoCarousel';
import { homeCarouselSlides } from '../data/photos';

export default function HomePage() {
  return (
    <>
      <Typography variant="h1" component="h1" className="section-title" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        Woodbine League of Games
      </Typography>

      <Typography color="text.secondary" className="page-intro">
        Your friendly neighborhood tabletop gaming group.
      </Typography>

      <PhotoCarousel files={homeCarouselSlides} />
    </>
  );
}

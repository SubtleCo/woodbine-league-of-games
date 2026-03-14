import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { photoUrl } from '../data/photos';

export default function PhotoCarousel({ slides }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides]);

  if (!slides?.length) return null;

  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Box className="carousel-root" aria-label="Photo carousel">
      <Box className="carousel-frame">
        {slides.map((slide, idx) => (
          <Box
            key={slide.file}
            className={`carousel-slide ${idx === current ? 'active' : ''}`}
          >
            <Box
              component="img"
              src={photoUrl(slide.file)}
              alt={slide.alt ?? ''}
              className="carousel-slide-image"
            />
          </Box>
        ))}

        <IconButton className="carousel-button prev" onClick={goPrev} aria-label="Previous photo">
          <ChevronLeftIcon />
        </IconButton>
        <IconButton className="carousel-button next" onClick={goNext} aria-label="Next photo">
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

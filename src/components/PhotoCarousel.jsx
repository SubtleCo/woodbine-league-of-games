import { useEffect, useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { photoUrl } from '../data/photos';

/*
  Reusable carousel.
  - Auto-plays every 4.5 seconds.
  - Supports manual prev/next.
  - Includes clickable dots for direct navigation.
*/
export default function PhotoCarousel({ files }) {
  const slides = useMemo(() => files ?? [], [files]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slides]);

  if (slides.length === 0) {
    return null;
  }

  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Box className="carousel-root" aria-label="Community photo carousel">
      <Box className="carousel-frame">
        {slides.map((file, idx) => (
          <Box
            key={file}
            component="img"
            src={photoUrl(file)}
            alt={`Woodbine photo ${idx + 1}`}
            className={`carousel-slide ${idx === current ? 'active' : ''}`}
          />
        ))}

        <IconButton className="carousel-button prev" onClick={goPrev} aria-label="Previous photo">
          <ChevronLeftIcon />
        </IconButton>

        <IconButton className="carousel-button next" onClick={goNext} aria-label="Next photo">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box className="carousel-dots">
        {slides.map((file, idx) => (
          <button
            key={`${file}-dot`}
            type="button"
            className={`carousel-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to photo ${idx + 1}`}
          />
        ))}
      </Box>
    </Box>
  );
}

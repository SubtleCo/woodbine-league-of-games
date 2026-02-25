import { useEffect, useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
  const slides = useMemo(
    () =>
      (files ?? []).map((entry, idx) => {
        if (typeof entry === 'string') {
          return {
            file: entry,
            title: `Community Night ${idx + 1}`,
            subtitle: 'Tables, laughter, and one more turn energy.',
            href: '/woodbinewednesdays'
          };
        }

        return {
          file: entry.file,
          title: entry.title ?? `Community Night ${idx + 1}`,
          subtitle: entry.subtitle ?? 'See what game night feels like in Woodbine.',
          href: entry.href ?? '/woodbinewednesdays'
        };
      }),
    [files]
  );
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
        {slides.map((slide, idx) => (
          <Box
            key={slide.file}
            className={`carousel-slide ${idx === current ? 'active' : ''}`}
          >
            <Box
              component="img"
              src={photoUrl(slide.file)}
              alt={slide.title}
              className="carousel-slide-image"
            />
            <Box className="carousel-slide-overlay" />
            <Box className="carousel-slide-content">
              <h3 className="carousel-slide-title">{slide.title}</h3>
              <p className="carousel-slide-subtitle">{slide.subtitle}</p>
              <Box component={RouterLink} to={slide.href} className="carousel-slide-link">
                Learn More
              </Box>
            </Box>
          </Box>
        ))}

        <IconButton className="carousel-button prev" onClick={goPrev} aria-label="Previous photo">
          <ChevronLeftIcon />
        </IconButton>

        <IconButton className="carousel-button next" onClick={goNext} aria-label="Next photo">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box className="carousel-dots">
        {slides.map((slide, idx) => (
          <button
            key={`${slide.file}-dot`}
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

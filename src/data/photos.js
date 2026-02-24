/*
  Centralized photo lists and URL helper.
  Paths are relative to public/photos.
*/
export const homeCarouselFiles = [
  'WLOG/IMG_0425.jpg',
  'WLOG/IMG_1903.jpg',
  'WLOG/IMG_2790.jpg',
  'WLOG/IMG_2800.jpg',
  'WLOG/IMG_2903.jpg',
  'WLOG/IMG_9101.jpg',
  'WLOG/IMG_9220.jpg',
  'WLOG/preview_L1000217.jpg'
];

export const woodbineWednesdaysPhotoFiles = [
  'WLOG/IMG_2790.jpg',
  'WLOG/IMG_2800.jpg',
  'WLOG/IMG_9220.jpg'
];

const basePath = import.meta?.env?.BASE_URL || '/';
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;

// Encode spaces and other special characters while keeping folder separators.
export const photoUrl = (filePath) => `${normalizedBasePath}photos/${encodeURI(filePath)}`;

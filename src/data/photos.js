/*
  Master list of site photos.
  Keeping file names here avoids scattering photo paths across many components.
*/
export const photoFiles = [
  'brink.jpg',
  'dominion.jpg',
  'IMG_0425.jpg',
  'IMG_1903.jpg',
  'IMG_2588.jpg',
  'IMG_2790.jpg',
  'IMG_2800.jpg',
  'IMG_2834.jpg',
  'IMG_2903.jpg',
  'IMG_9101.jpg',
  'IMG_9220.jpg',
  'moonrakers.jpg',
  'moonrakers_2.jpg',
  'moonrakers_3.jpg',
  'old_kings_crown.jpg',
  'preview_L1000217.jpg',
  'realm_of_reckoning.jpg',
  'root.jpg',
  'root_2.jpg',
  'silverfrost.jpg',
  'tend.jpg',
  'tend_setup.jpg',
  'time_to_panic.jpg',
  'vantage.jpg',
  'veiled_fate.jpg',
  'veiled_fate_2.jpg',
  'Woodbine_Wednesdays.jpg'
];

const basePath = import.meta.env.BASE_URL || '/';
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;

// Build image URLs from Vite's configured base path so GitHub project pages
// and custom/root domains both resolve correctly.
export const photoUrl = (fileName) => `${normalizedBasePath}photos/${fileName}`;

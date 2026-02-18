/*
  Master list of site photos.
  Keeping file names here avoids scattering photo paths across many components.
*/
export const photoFiles = [
  'brink.png',
  'dominion.png',
  'IMG_0425.png',
  'IMG_1903.png',
  'IMG_2588.png',
  'IMG_2790.png',
  'IMG_2800.png',
  'IMG_2834.png',
  'IMG_2903.png',
  'IMG_9101.png',
  'IMG_9220.png',
  'moonrakers.png',
  'moonrakers_2.png',
  'moonrakers_3.png',
  'old_kings_crown.png',
  'preview_L1000217.png',
  'realm_of_reckoning.png',
  'root.png',
  'root_2.png',
  'silverfrost.png',
  'tend.png',
  'tend_setup.png',
  'time_to_panic.png',
  'vantage.png',
  'veiled_fate.png',
  'veiled_fate_2.png',
  'Woodbine_Wednesdays.png'
];

// Use root-relative asset paths so production on the custom domain resolves
// consistently, regardless of hash routes or document-relative URL changes.
export const photoUrl = (fileName) => `/photos/${fileName}`;

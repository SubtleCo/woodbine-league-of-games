/*
  Centralized photo lists and URL helper.
  Paths are relative to public/photos.
*/
export const homeCarouselSlides = [
  {
    file: 'WLOG/AlexIsWeird.jpg',
    title: 'IV Studio Night',
    subtitle: 'Moonrakers and Veiled Fate tookover the tables',
    href: '/woodbinewednesdays'
  },
  {
    file: 'WLOG/MKChamps.jpg',
    title: "Nashville's Best Drivers",
    subtitle: 'Champions of the 2025 Mario Kart for Community Tournament at Fait La Force',
    href: '/woodbinewednesdays'
  },
  {
    file: 'WLOG/TendParty.jpg',
    title: "IV Studio's Tend",
    subtitle: 'A 13 player game of our favorite flip-n-write',
    href: '/stuffwelike'
  },
  {
    file: 'WLOG/Peti.jpg',
    title: 'Small Box Warmups',
    subtitle: 'We might warm up on Wednesday nights with smaller games, like Petiquette from Oink Games',
    href: '/woodbinewednesdays'
  },
  {
    file: 'WLOG/Overflow.jpg',
    title: 'Always a spot for ya',
    subtitle: 'Wednesday nights may get busy, but gamers will always find a place to push meeples',
    href: '/woodbinewednesdays'
  },
  {
    file: 'WLOG/MKTourney.jpg',
    title: 'Mario Kart for Community Tournament 2k25',
    subtitle: 'Raising money for our community, but with blue shells and banana peels',
    href: '/woodbinewednesdays'
  },
  {
    file: 'WLOG/Bristol.jpg',
    title: 'Bristol 1350',
    subtitle: 'I forgot who had the plague, was it all of us? I think it was all of us',
    href: '/woodbinewednesdays'
  }
];

export const woodbineWednesdaysPhotoFiles = [
  'WLOG/old_kings_crown.jpg',
  'WLOG/root.jpg',
  'WLOG/tend.jpg'
];

const basePath = import.meta?.env?.BASE_URL || '/';
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;

// Encode spaces and other special characters while keeping folder separators.
export const photoUrl = (filePath) => `${normalizedBasePath}photos/${encodeURI(filePath)}`;

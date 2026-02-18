import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const imagesDir = resolve(process.cwd(), 'public/images');

rm(imagesDir, { recursive: true, force: true }).catch((error) => {
  console.error('Failed to remove generated public/images directory:', error);
  process.exitCode = 1;
});

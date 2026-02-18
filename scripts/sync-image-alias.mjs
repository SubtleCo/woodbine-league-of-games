import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const photosDir = resolve(root, 'public/photos');
const imagesDir = resolve(root, 'public/images');

async function syncImageAlias() {
  const photoEntries = await readdir(photosDir);

  await mkdir(imagesDir, { recursive: true });
  await rm(imagesDir, { recursive: true, force: true });
  await mkdir(imagesDir, { recursive: true });

  await Promise.all(
    photoEntries
      .filter((fileName) => fileName.toLowerCase() !== '.ds_store')
      .map((fileName) =>
        cp(resolve(photosDir, fileName), resolve(imagesDir, fileName), {
          force: true
        })
      )
  );
}

syncImageAlias().catch((error) => {
  console.error('Failed to sync public/images from public/photos:', error);
  process.exitCode = 1;
});

import { Typography } from '@mui/material';
import StoryBlock from '../components/StoryBlock';

/*
  Wednesday content page.
  The text is placeholder Lorem Ipsum as requested and can be replaced with real writeups.
*/
export default function WoodbineWednesdaysPage() {
  return (
    <>
      <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        Woodbine Wednesdays
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Weekly snapshots from the tables: who played what, what made us laugh, and what we are excited to run back.
      </Typography>

      <StoryBlock
        image="IMG_2790.png"
        imageAlt="Players gathered around a game table"
        imageAlign="left"
        paragraphs={[
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor viverra sem, ac porttitor eros dictum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
          'Sed volutpat dui ac sem convallis, a sollicitudin leo eleifend. Curabitur aliquet pellentesque orci, sed ultricies tortor volutpat at. Quisque non augue vel diam posuere accumsan vitae at odio.'
        ]}
      />

      <StoryBlock
        image="IMG_2800.png"
        imageAlt="Close-up of a game in progress"
        imageAlign="right"
        paragraphs={[
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit, elit vitae dictum dictum, nibh purus fringilla elit, ac tincidunt nisl lacus sed elit. Integer mattis purus lorem, vitae posuere est cursus vitae.',
          'Suspendisse hendrerit tincidunt dignissim. Etiam feugiat, turpis ac feugiat commodo, lorem est malesuada nisl, id ultricies erat metus a massa. Morbi feugiat orci et risus tempor, non cursus elit ullamcorper.'
        ]}
      />

      <StoryBlock
        image="IMG_9220.png"
        imageAlt="Friends smiling during game night"
        imageAlign="left"
        paragraphs={[
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt facilisis risus, sit amet aliquet purus bibendum nec. In vehicula velit ac ligula posuere feugiat. Integer ac aliquet sem, vitae posuere sapien.',
          'Mauris posuere erat non sem vulputate consequat. Nulla facilisi. Vivamus et massa ac dolor condimentum finibus et non libero. Integer scelerisque nisl vel mauris egestas elementum.'
        ]}
      />
    </>
  );
}

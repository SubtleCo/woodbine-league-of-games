import { Typography } from '@mui/material';
import StoryBlock from '../components/StoryBlock';
import { woodbineWednesdaysPhotoFiles } from '../data/photos';

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
        Every Wednesday evening at Primitive Coffee! We start at 6pm and go til we go! This is your invitation to come!
      </Typography>

      <StoryBlock
        image={woodbineWednesdaysPhotoFiles[0]}
        imageAlt="Players gathered around a game table"
        imageAlign="left"
        paragraphs={[
          "Alex and Anna were tired of looking for a steadfast tabletop gaming group. At the same time, in February of 2025, we sat down to play Stonemaier's Apiary at Primitive Coffee when Trey, the owner of Primitive Coffee Co, informed us that we were, in fact, in a building owned by a board game company.",
          "We met the fine folks of IV Studio, fell in love with thier games (and Alex found his favorite game ever in Moonrakers), and decided to put up a sign at Primitive saying something like 'Hey we play boardgames here on Wednesday night, and you should too.'"
        ]}
      />

      <StoryBlock
        image={woodbineWednesdaysPhotoFiles[1]}
        imageAlt="Close-up of a game in progress"
        imageAlign="right"
        paragraphs={[
          "That was a while ago. At the beginning, we were a steadfast group of about 8 reliable gamers who showed up almost every Wednesday night, and now we've grown to the point were we're forcing Primitive to shop for more tables and chairs!",
          "We usually arrive around 6pm and play smaller games until we've hit a quorum around 6:30, when we break into big box games. We always end up closing down the shop (and have a key so we can go even later!)"
        ]}
      />

      <StoryBlock
        image={woodbineWednesdaysPhotoFiles[2]}
        imageAlt="Friends smiling during game night"
        imageAlign="left"
        paragraphs={[
          "In March of 2026, we opened up a tiny retail shop called Stuff We Like of just our favorite board games. The hope is to get the word out to people who haven't played a game since Monopoly that the board game industry has been COOKING, and there's never been a better time to start growing your library and start connecting with new people",
          "Look. The world is a lot. Perhaps now more than ever. We want the Woodbine League of Games to be a space where anyone and everyone can come, sit, pocket their phones, and push some pieces around a board while connecting with people they otherwise would never have met. We believe connecting with each other is the key to understanding each other, and that board games can save the world."
        ]}
      />
    </>
  );
}

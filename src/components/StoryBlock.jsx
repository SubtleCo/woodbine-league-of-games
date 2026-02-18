import { Box, Paper, Typography } from '@mui/material';
import { photoUrl } from '../data/photos';

/*
  Content block used on Woodbine Wednesdays and game pages.
  Set imageAlign to "left" or "right" to alternate visual rhythm.
*/
export default function StoryBlock({ image, imageAlt, imageAlign = 'left', paragraphs = [] }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        border: '1px solid rgba(13, 95, 79, 0.2)',
        backgroundColor: 'rgba(255, 250, 240, 0.72)'
      }}
    >
      <Box
        component="img"
        src={photoUrl(image)}
        alt={imageAlt}
        className={`story-image ${imageAlign}`}
      />

      {paragraphs.map((paragraph) => (
        <Typography key={paragraph} paragraph>
          {paragraph}
        </Typography>
      ))}
    </Paper>
  );
}

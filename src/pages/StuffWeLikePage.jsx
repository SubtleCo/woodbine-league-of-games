import { Card, CardContent, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { games } from '../data/games';

/*
  Store landing page.
  It maps over the games data array so one update creates both list + detail pages.
*/
export default function StuffWeLikePage() {
  return (
    <>
      <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.6rem' } }}>
        Stuff We Like
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        A growing shelf-by-shelf guide to the games carried by our store.
      </Typography>

      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.slug}>
            <Card sx={{ height: '100%', border: '1px solid rgba(13, 95, 79, 0.2)' }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontSize: '1.05rem', mb: 1 }}>
                  {game.name}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 1.2 }}>
                  {game.shortDescription}
                </Typography>

                <Link component={RouterLink} to={`/stuffwelike/${game.slug}`} underline="hover">
                  View game page
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

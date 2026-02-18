import { Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

/*
  Main top navigation.
  NavLink gives us route awareness so the active section is highlighted.
*/
export default function MainNav() {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      flexWrap="wrap"
      sx={{ mb: 3, rowGap: 1 }}
      aria-label="Main menu"
    >
      <Button
        component={NavLink}
        to="/stuffwelike"
        variant="contained"
        color="primary"
        sx={linkButtonSx}
      >
        Stuff We Like (store)
      </Button>

      <Button
        component={NavLink}
        to="/woodbinewednesdays"
        variant="contained"
        color="primary"
        sx={linkButtonSx}
      >
        Woodbine Wednesdays
      </Button>
    </Stack>
  );
}

const linkButtonSx = {
  borderRadius: '999px',
  px: 2,
  py: 0.8,
  boxShadow: '0 8px 16px rgba(13, 95, 79, 0.22)',
  '&.active': {
    background: 'linear-gradient(135deg, #d97b38, #bb5d25)'
  }
};

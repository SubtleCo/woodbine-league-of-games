import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

/*
  Main top navigation.
  NavLink gives us route awareness so the active section is highlighted.
*/
export default function MainNav() {
  const navItems = [
    { type: 'internal', to: '/stuffwelike', label: 'Stuff We Like' },
    { type: 'internal', to: '/woodbinewednesdays', label: 'Woodbine Wednesdays' },
    { type: 'external', href: 'https://primitivecoffee.co', label: 'Primitive Coffee Co' },
    { type: 'external', href: 'https://iv.studio', label: 'IV Studio' }
  ];

  return (
    <Box className="main-nav" aria-label="Main menu">
      {navItems.map((item, index) => (
        <Box key={item.to ?? item.href} component="span" className="main-nav-item">
          {item.type === 'internal' ? (
            <NavLink to={item.to} className={({ isActive }) => `main-nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ) : (
            <a href={item.href} className="main-nav-link" target="_blank" rel="noreferrer">
              {item.label}
            </a>
          )}
          {index < navItems.length - 1 && <span className="main-nav-divider">/</span>}
        </Box>
      ))}
    </Box>
  );
}

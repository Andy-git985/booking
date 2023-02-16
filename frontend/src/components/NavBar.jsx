import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Reserve Class', path: '/reserve' },
  { name: 'Add Class', path: '/add' },
  { name: 'Register', path: '/user/register' },
  { name: 'Login', path: '/user/login' },
];

const activeStyle = {
  color: 'red',
};

const NavBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        outline: '1px solid black',
        gap: '1rem',
        padding: '2rem',
        mb: '1rem',
      }}
    >
      {links.map((link, index) => (
        <NavLink
          to={link.path}
          style={({ isActive }) => (isActive ? activeStyle : null)}
          key={`${link.name}-${index}`}
        >
          <Typography variant="body">{link.name}</Typography>
        </NavLink>
      ))}
    </Box>
  );
};

export default NavBar;

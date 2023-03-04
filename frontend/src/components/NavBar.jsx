import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../features/userSlice';
import { links } from '../data';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';

const activeStyle = {
  color: 'red',
};

const inactiveStyle = {};

const NavBar = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector(({ user }) => user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box sx={{ mb: 2 }}>
      <AppBar position="relative">
        <Toolbar>
          {/* Quick fix until I minimize menu options */}
          <Container>
            {links.map((link, index) => (
              <NavLink
                to={link.path}
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
                key={`${link.name}-${index}`}
              >
                <Typography variant="body" sx={{ mr: 2 }}>
                  {link.name}
                </Typography>
              </NavLink>
            ))}
          </Container>

          <Box sx={{ flexGrow: 1 }} />
          {userDetails && (
            <>
              <Typography variant="body" sx={{ mr: 2 }}>
                {userDetails.email}
              </Typography>

              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

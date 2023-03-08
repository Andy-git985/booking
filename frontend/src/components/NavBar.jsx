import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../features/userSlice';
import { links } from '../data';
import { Divider } from '@mui/material';
import { useState } from 'react';

const activeStyle = {
  color: 'red',
};

const inactiveStyle = {};

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const getList = () => (
    <Box onClick={() => setOpen(false)}>
      <List>
        {links.map((link) => (
          <>
            <ListItem key={link.id}>
              <NavLink
                to={link.path}
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <ListItemText primary={link.name} />
              </NavLink>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setOpen(true)}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={'left'} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </>
  );
};

const NavBar = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector(({ user }) => user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box sx={{ mb: 2 }}>
      <AppBar component="nav" position="relative">
        <Toolbar>
          <DrawerMenu />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to="/reserve">
              <Button variant="contained">Book now</Button>
            </Link>
          </Box>
          {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {links.map((link) => {
              return (
                <NavLink
                  to={link.path}
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  key={link.id}
                >
                  <Typography variant="body" sx={{ mr: 2 }}>
                    i {link.name}
                  </Typography>
                </NavLink>
              );
            })}
          </Box> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to="/*">
              <Typography variant="h6">Home</Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {userDetails ? (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link to="user/profile">
                <IconButton edge="start" sx={{ mr: 1 }}>
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
              </Link>

              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link to="user/register">
                <Button>Signup</Button>
              </Link>
              <Link to="user/login">
                <Button variant="contained">Login</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

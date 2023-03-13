import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../features/userSlice';
import { links } from '../data';
import { useState } from 'react';
import { theme } from '../styles/styles';
import logoTop from '../assets/images/cover-logo-top.png';
import { palette } from '@mui/system';

const DrawerMenu = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector(({ user }) => user);
  const linksToRender = userDetails
    ? links.filter((link) => link.loggedIn)
    : links;

  const [open, setOpen] = useState(false);
  const getList = () => (
    <Box
      onClick={() => setOpen(false)}
      sx={{
        height: '100vh',
        height: '100dvh',
        backgroundColor: theme.palette.primary.main,
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      <IconButton
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
          mb: 2,
          paddingRight: 2,
        }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
      <List>
        {linksToRender.map((link) => (
          <ListItem
            key={link.id}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <NavLink to={link.path}>
              <ListItemText
                primary={link.name}
                primaryTypographyProps={{
                  fontFamily: 'Corben',
                  fontWeight: 700,
                }}
              />
            </NavLink>
          </ListItem>
        ))}
        {userDetails && (
          <>
            <ListItem
              onClick={() => dispatch(logoutUser())}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontFamily: 'Corben',
                  fontWeight: 700,
                }}
              />
            </ListItem>
          </>
        )}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardMedia
          component="img"
          sx={{
            // aspectRatio: '16 / 9',
            // width: '100px',
            display: 'flex',
            justifyContent: 'center',
            width: 'clamp(200px, 60%, 300px)',
          }}
          image={logoTop}
          alt="logo"
        />
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setOpen(true)}
        sx={{
          mr: 2,
          display: { sm: 'none' },
          color: theme.palette.secondary.dark,
        }}
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
      <AppBar
        component="nav"
        position="relative"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Toolbar>
          <DrawerMenu />
          <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }} />

          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Link to="/*">
              <Typography variant="h5">Cut Above</Typography>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to="/reserve">
              <Button variant="contained">Book now</Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to="/*">
              <Typography variant="h5">Cut Above</Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
          {userDetails ? (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link to="user/profile">
                <IconButton
                  edge="start"
                  sx={{ mr: 1, color: theme.palette.secondary.dark }}
                >
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
                <Button sx={{ color: theme.palette.secondary.dark }}>
                  Signup
                </Button>
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

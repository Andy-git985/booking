import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../features/userSlice';
import { links } from '../data';

const activeStyle = {
  color: 'red',
};

const NavBar = () => {
  const { userDetails } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
      <Box sx={{ flexGrow: 1 }}></Box>
      {userDetails && (
        <>
          <Typography variant="body">{userDetails.email}</Typography>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </Box>
  );
};

export default NavBar;

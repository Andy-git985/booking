import { forwardRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddClass from './pages/AddClass';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ReserveClass from './pages/ReserveClass';
import ProtectedRoute from './routing/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { theme } from './styles/styles';

import Footer from './components/Footer';
import Notification from './components/Notification';
import { retrieveSchedule } from './features/scheduleSlice';
import Home from './pages/Home';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveSchedule());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <Notification />
        <Box
          sx={{
            minHeight: '100vh',
            minHeight: '100dvh',
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/reserve" element={<ReserveClass />} />
            <Route path="/add" element={<AddClass />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/user/profile" element={<Profile />} />
            </Route>
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

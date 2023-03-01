import { forwardRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddClass from './pages/AddClass';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ReserveClass from './pages/ReserveClass';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './styles/styles';

import Notification from './components/Notification';
import { retrieveSchedule } from './features/scheduleSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveSchedule());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Notification />
        <NavBar />
        <Routes>
          <Route path="/*" element={<div>Home</div>} />
          <Route path="/reserve" element={<ReserveClass />} />
          <Route path="/add" element={<AddClass />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

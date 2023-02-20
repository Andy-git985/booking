import { forwardRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddClass from './pages/AddClass';
import Login from './pages/Login';
import Register from './pages/Register';
import ReserveClass from './pages/ReserveClass';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './styles/styles';

import { retrieveAppointments } from './features/scheduleSlice';
import Notification from './components/Notification';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveAppointments());
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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

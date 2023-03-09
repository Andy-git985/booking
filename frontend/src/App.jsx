import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Footer from './components/Footer';
import AddClass from './pages/AddClass';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ReserveClass from './pages/ReserveClass';
import LoginRoute from './routing/LoginRoute';
import ProtectedRoute from './routing/ProtectedRoute';
import Box from '@mui/material/Box';
import { theme } from './styles/styles';

import { retrieveSchedule } from './features/scheduleSlice';
import { getEmployeeDetails } from './features/userSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveSchedule());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployeeDetails());
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
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/add" element={<AddClass />} />
            {/* </Route> */}
            <Route element={<LoginRoute />}>
              <Route path="/user/profile" element={<Profile />} />
            </Route>
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { retrieveAppointments } from './features/scheduleSlice';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    dispatch(retrieveAppointments());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <NavBar />
        <Routes>
          <Route path="/*" element={<div>Home</div>} />
          <Route path="/reserve" element={<ReserveClass />} />
          <Route path="/add" element={<AddClass />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
        </Routes>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {alert}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </BrowserRouter>
  );
}

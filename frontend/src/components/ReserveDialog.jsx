import { forwardRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import scheduleServices from '../services/schedule';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReserveDialog = ({ disabled, search, schedule, time }) => {
  const [alert, setAlert] = useState({ status: '', message: '' });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReserve = async (date, time) => {
    setOpen(false);
    const dateToBook = schedule.find((s) => s.date === date)?.id;
    if (dateToBook) {
      try {
        const response = await scheduleServices.reserveTime(dateToBook, time);
        console.log(response);
      } catch (error) {
        console.log(error.response.data.error);
        setAlert({ status: 'error', message: error.response.data.error });
      }
    } else {
      console.log('Error');
    }
  };

  return (
    <>
      <Button variant="contained" disabled={disabled} onClick={handleClick}>
        Reserve Now
      </Button>
      <Dialog open={open}>
        <DialogTitle>Would you like to reserve this class?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            On {search.date} at {time} for{' '}
            {search.guest > 1 ? `${search.guest} guests` : '1 guest'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleReserve(search.date, { time })}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alert.status}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReserveDialog;

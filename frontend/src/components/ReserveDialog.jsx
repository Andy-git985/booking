import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import scheduleServices from '../services/schedule';

const ReserveDialog = ({ disabled, search, schedule, time }) => {
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
      const response = await scheduleServices.reserveTime(dateToBook, time);
      console.log(response);
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
    </>
  );
};

export default ReserveDialog;

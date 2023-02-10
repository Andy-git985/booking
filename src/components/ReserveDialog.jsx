import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

const ReserveDialog = ({ reserveButton, date, time, guest }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        disabled={reserveButton}
        onClick={handleClick}
      >
        Reserve Now
      </Button>
      <Dialog open={open}>
        <DialogTitle>Would you like to reserve this class?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            On {date} at {time} for {guest > 1 ? `${guest} guests` : '1 guest'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReserveDialog;

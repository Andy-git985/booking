import { forwardRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import dayjs from 'dayjs';

const ReserveDialog = ({ disabled, handleReserve, search, selectedSlot }) => {
  const [alert, setAlert] = useState({ status: '', message: '' });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = (obj) => {
    setOpen(false);
    handleReserve(obj);
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
            On {search.date} at {dayjs(selectedSlot.time).format('h:mma')} for{' '}
            {search.guest > 1 ? `${search.guest} guests` : '1 guest'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleAgree({ id: selectedSlot.id, date: search.date })
            }
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

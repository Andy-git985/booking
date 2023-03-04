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
import dateServices from '../services/date';

const ReserveDialog = ({
  disabled,
  handleReserve,
  date,
  person,
  selectedSlot,
}) => {
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
        <DialogTitle>Would you like to reserve this appointment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            With {person.email} on {dateServices.dateHyphen(date)} at{' '}
            {dateServices.time(selectedSlot.time)} for{' '}
            {/* {search.guest > 1 ? `${search.guest} guests` : '1 guest'}? */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleAgree({ id: selectedSlot.id, person: person.id })
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

import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import dateServices from '../services/date';

const ReserveDialog = ({
  disabled,
  handleReserve,
  date,
  person,
  selectedSlot,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = (id) => {
    setOpen(false);
    handleReserve(id);
  };

  return (
    <>
      <Button variant="contained" disabled={disabled} onClick={handleClick}>
        Reserve Now
      </Button>
      <Dialog open={open} fullScreen={fullScreen}>
        <DialogTitle>Would you like to reserve this appointment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            With {person.email} on {dateServices.dateHyphen(date)} at{' '}
            {dateServices.time(selectedSlot.time)} ?
            {/* for{' '} {search.guest > 1 ? `${search.guest} guests` : '1 guest'}? */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAgree(selectedSlot.id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReserveDialog;

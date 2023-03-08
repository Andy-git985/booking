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
  disabled = false,
  dialog,
  handler,
  // handleReserve,
  // date,
  // person,
  // selectedSlot,
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

  const handleAgree = () => {
    setOpen(false);
    handler();
  };

  return (
    <>
      <Button variant="contained" disabled={disabled} onClick={handleClick}>
        {dialog.button}
      </Button>
      <Dialog open={open} fullScreen={fullScreen}>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReserveDialog;

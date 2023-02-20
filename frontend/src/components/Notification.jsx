import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Notification = () => {
  const { error } = useSelector(({ user }) => user);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState('');
  const vertical = 'top';
  const horizontal = 'center';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
      setSeverity('error');
      setAlert(error);
    }
  }, [error]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        <Alert severity={severity}>{alert}</Alert>
      </Snackbar>
    </>
  );
};

export default Notification;

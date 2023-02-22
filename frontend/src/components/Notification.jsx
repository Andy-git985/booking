import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlertMessage, clearErrorMessage } from '../features/userSlice';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Notification = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
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
    if (user.alert) {
      setOpen(true);
      setSeverity('success');
      setAlert(user.alert);
      dispatch(clearAlertMessage());
    }
  }, [dispatch, user.alert]);

  useEffect(() => {
    if (user.error) {
      setOpen(true);
      setSeverity('error');
      setAlert(user.error);
      dispatch(clearErrorMessage());
    }
  }, [dispatch, user.error]);

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

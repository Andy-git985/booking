import { useSelector } from 'react-redux';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Login from '../pages/Login';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector(({ user }) => user);
  if (!userDetails.role !== 'admin') {
    return (
      <Alert severity="error">
        <AlertTitle>Forbidden</AlertTitle>
        You do not have access to this page.
        <Box sx={{ mt: 1 }}>
          <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </Alert>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;

import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { loginUser } from '../features/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector(({ user }) => user);
  const [alert, setAlert] = useState('');

  // useEffect(() => {
  //   if (user.status === 'rejected') {
  //     setAlert(user.error);
  //   }
  // }, [user.status, user.error]);

  // useEffect(() => {
  //   if (user.status === 'fulfilled') {
  //     setAlert(user.alert);
  //   }
  // }, [user.status, user.alert]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/');
  //   }
  // }, [userInfo, navigate]);

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  return (
    <>
      <div>{alert}</div>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px',
            padding: '5px',
          }}
        >
          <Typography component="h1">Log In</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '10px',
                padding: '5px',
              }}
            >
              <TextField
                label="Email"
                required
                {...register('email')}
              ></TextField>
              <TextField
                label="Password"
                type="password"
                required
                {...register('password')}
              ></TextField>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
          {/* <Link to="/user/register">
            <Typography component="h1">
              Don't have an account? Sign up!
            </Typography>
          </Link> */}
        </Paper>
      </Container>
    </>
  );
};

export default Login;

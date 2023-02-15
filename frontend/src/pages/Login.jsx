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
import { logInUser } from '../reducers/userReducer';
import userServices from '../services/user';
import Google from '../img/google.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(({ user }) => user);
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

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const onSubmit = async (data) => {
    // const homePage = await userServices.login(data);
    dispatch(logInUser(data));
  };

  const googleLogin = async () => {
    const url = await userServices.getLoginUrl();
    console.log(url);
    window.open(url, '_self');
  };

  return (
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
              required
              {...register('password')}
            ></TextField>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
        <Button onClick={googleLogin}>
          <img
            src={Google}
            alt="google-logo"
            style={{
              backgroundColor: 'black',
              width: '35px',
              padding: '5px',
              borderRadius: '50%',
            }}
          ></img>
        </Button>
        <Link to="/user/register">
          <Typography component="h1">
            Don't have an account? Sign up!
          </Typography>
        </Link>
      </Paper>
    </Container>
  );
};

export default Login;

import { forwardRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { loginUser } from '../features/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector(({ user }) => user);
  useEffect(() => {
    if (userDetails) {
      navigate('/user/profile');
    }
  }, [userDetails, navigate]);

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

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase();
    dispatch(loginUser(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px',
          mt: '8px',
          padding: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            required
            fullWidth
            margin="normal"
            {...register('email')}
          ></TextField>
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            margin="normal"
            {...register('password')}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 3 }}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

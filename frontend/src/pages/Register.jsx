import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
// import { registerUser } from '../reducers/userReducer';
import userServices from '../services/user';

const Register = () => {
  // const navigate = useNavigate();
  // const { userInfo } = useSelector(({ user }) => user);
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/');
  //   }
  // }, [userInfo, navigate]);

  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState,
  //   formState: { isSubmitSuccessful },
  // } = useForm({});
  // //   defaultValues: {
  // //   email: '',
  // //   password: '',
  // // },

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      // set a error message
      return;
    }
    data.email = data.email.toLowerCase();
    // dispatchEvent(data);
    // dispatchEvent(registerUser(data));
    console.log('submitting', data);
    const response = await userServices.register(data);
    console.log(response);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
      i
    >
      <Paper elevation={3}>
        <Typography component="h1">Register</Typography>
        {/* <form> */}
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
            <TextField
              label="Confirm password"
              type="password"
              required
              {...register('confirmPassword')}
            ></TextField>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;

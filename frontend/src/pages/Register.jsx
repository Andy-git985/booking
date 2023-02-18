import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { registerUser } from '../features/userSlice';
import { roles } from '../data';

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
  const dispatch = useDispatch();
  const { control, register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      // set a error message
      return;
    }
    data.email = data.email.toLowerCase();
    // dispatchEvent(data);
    dispatch(registerUser(data));
    // console.log('submitting', data);
    // const response = await userServices.register(data);
    // console.log(response);
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
      <Paper elevation={3}>
        <Typography component="h1">Register</Typography>
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

            <Controller
              name="role"
              render={({ field }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select {...field} label="role">
                      {roles.map((role) => (
                        <MenuItem key={role.id} value={role.data}>
                          {role.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
              control={control}
              defaultValue=""
            />
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

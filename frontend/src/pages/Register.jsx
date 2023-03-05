import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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
    if (data.password !== data.confirmPassword) {
      // set a error message
      return;
    }
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
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
          Register
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
          <TextField
            label="Confirm password"
            type="password"
            required
            fullWidth
            margin="normal"
            {...register('confirmPassword')}
          ></TextField>

          <Controller
            name="role"
            render={({ field }) => (
              <>
                <FormControl fullWidth margin="normal">
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 3 }}
          >
            Register
          </Button>
          <Grid container>
            <Box sx={{ flexGrow: 1 }} />
            <Grid item>
              <Link href="#" variant="body2">
                {'Already have an account? Login'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;

import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const ContactUs = () => {
  const { control, register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <Container component="main" maxWidth="md">
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
          Contact us
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={6}>
              <TextField
                label="First name"
                margin="normal"
                fullWidth
                {...register('firstName')}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last name"
                margin="normal"
                fullWidth
                {...register('lastName')}
              ></TextField>
            </Grid>
          </Grid>
          <TextField
            label="Email"
            required
            fullWidth
            margin="normal"
            {...register('confirmPassword')}
          ></TextField>
          <TextField
            label="Message"
            required
            fullWidth
            margin="normal"
            multiline
            {...register('message')}
          ></TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 3 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default ContactUs;

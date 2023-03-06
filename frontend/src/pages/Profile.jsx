import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/userSlice';
import dateServices from '../services/date';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { getUserAppts, cancelAppt } from '../features/appointmentSlice';
import andre from '../assets/images/andre-reis-_XD3D9pH83k-unsplash.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Person = ({ role, appt }) => {
  return (
    <>
      <Avatar alt="Remy Sharp" src={andre} sx={{ width: 56, height: 56 }} />
      {role === 'client' ? (
        <Typography variant="body1">{appt.employee.email}</Typography>
      ) : (
        <Typography>{appt.client.email}</Typography>
      )}
    </>
  );
};

// TODOS: Button Styling

const Profile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(({ appointment }) => appointment);
  const { userDetails } = useSelector(({ user }) => user);
  const role = userDetails?.role;

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserAppts());
  }, [dispatch]);

  const handleModify = () => {};
  const handleCancel = (data) => {
    dispatch(cancelAppt(data));
  };

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Typography component="h3" variant="h4" align="center" gutterBottom>
          Upcoming appointments
        </Typography>
        <Stack spacing={2}>
          {data ? (
            data.map((appt) => {
              return (
                <Item key={appt.id}>
                  <Typography variant="body1">
                    {dateServices.dateHyphen(appt.date)}
                  </Typography>
                  <Typography variant="body1">
                    {dateServices.time(appt.time)}
                  </Typography>
                  <Person role={role} appt={appt} />
                  <Button onClick={handleModify}>Modify</Button>
                  <Button
                    onClick={() =>
                      handleCancel({ id: appt.id, time: appt.time })
                    }
                  >
                    Cancel
                  </Button>
                </Item>
              );
            })
          ) : (
            <div>No appointments made</div>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Profile;

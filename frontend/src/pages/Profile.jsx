import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/userSlice';
import dateServices from '../services/date';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {
  getUserAppts,
  cancelAppt,
  beginRescheduling,
} from '../features/appointmentSlice';
import ReserveDialog from '../components/ReserveDialog';
import andre from '../assets/images/andre-reis-_XD3D9pH83k-unsplash.jpg';
import date from '../services/date';
import { useNavigate } from 'react-router-dom';
import { restoreAvailability } from '../features/scheduleSlice';

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
        <Typography variant="body1">{appt.employee.firstName}</Typography>
      ) : (
        <Typography>{appt.client.email}</Typography>
      )}
    </>
  );
};

// TODOS: Button Styling

const Profile = () => {
  const navigate = useNavigate();
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

  const handleModify = (id) => {
    dispatch(beginRescheduling(id));
    navigate('/reserve');
    // console.log('modify');
  };
  const handleCancel = async (id) => {
    try {
      const cancelledAppt = await dispatch(cancelAppt(id)).unwrap();
      if (cancelledAppt.success) {
        const { updatedSchedule } = cancelledAppt.data;
        dispatch(restoreAvailability(updatedSchedule));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const content = (appt) =>
    `With ${
      role === 'client' ? appt.employee.email : appt.client.email
    } on ${date.dateHyphen(appt.date)} at ${date.time(appt.time)}?`;

  const dialog = (action, appt) => {
    return {
      button: action,
      title: `Would you like to ${action.toLowerCase()} this appointment?`,
      content: content(appt),
    };
  };

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Typography
          component="h3"
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 3 }}
        >
          {`Welcome ${userDetails.firstName} ${userDetails.lastName}`}
        </Typography>
        <Divider />
        <Typography
          component="h3"
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 2, mb: 3 }}
        >
          Upcoming appointments
        </Typography>
        <Stack spacing={2}>
          {data ? (
            data.map((appt) => {
              return (
                <Item key={appt.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                      }}
                    >
                      <Typography variant="body1">
                        {dateServices.dateHyphen(appt.date)}
                      </Typography>
                      <Typography variant="body1">
                        {dateServices.time(appt.time)}
                      </Typography>
                      <Person role={role} appt={appt} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <ReserveDialog
                        dialog={dialog('Modify', appt)}
                        handler={() => handleModify(appt.id)}
                      />
                      <ReserveDialog
                        dialog={dialog('Cancel', appt)}
                        handler={() => handleCancel(appt.id)}
                      />
                    </Box>
                  </Box>
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

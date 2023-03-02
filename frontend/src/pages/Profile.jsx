import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/userSlice';
import dateServices from '../services/date';
import { getUserAppts } from '../features/appointmentSlice';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Person = ({ role, appt }) => {
  return (
    <>
      {role === 'client' ? (
        <>{appt.employee.email}</>
      ) : (
        <>{appt.client.email}</>
      )}
    </>
  );
};

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

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {data ? (
            data.map((appt) => {
              return (
                <Item>
                  {dateServices.dateHyphen(appt.date)}{' '}
                  {dateServices.time(appt.time)}{' '}
                  <Person role={role} appt={appt} />
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

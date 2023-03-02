import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/userSlice';
import dateServices from '../services/date';
import { getUserAppts, cancelAppt } from '../features/appointmentSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

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

// TODOS: Button Styling

const Profile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(({ appointment }) => appointment);
  console.log(data);
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
        <Stack spacing={2}>
          {data ? (
            data.map((appt) => {
              return (
                <div key={appt.id}>
                  <Item>
                    {dateServices.dateHyphen(appt.date)}{' '}
                    {dateServices.time(appt.time)}{' '}
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
                </div>
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

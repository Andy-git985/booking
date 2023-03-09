import { Paper, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import andre from '../assets/images/andre-reis-_XD3D9pH83k-unsplash.jpg';
import obi from '../assets/images/obi-pixel7propix--sRVfY0f2d8-unsplash.jpg';
import salah from '../assets/images/salah-regouane-Z2WfmQC-sVk-unsplash.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',
}));

const TimeSlotDetail = ({ available, selectPerson }) => {
  const handleClick = (id, email) => {
    selectPerson({ id, email, disabled: false });
  };
  console.log('available', available);
  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Stack spacing={2}>
        {available.map((person) => {
          return (
            <div key={person.id}>
              <Item onClick={(i) => handleClick(person.id, person.email)}>
                <Avatar
                  alt={person.firstName}
                  src={person.image}
                  sx={{ width: 56, height: 56 }}
                />
                {person.email}
              </Item>
            </div>
          );
        })}
      </Stack>
    </Container>
  );
};

export default TimeSlotDetail;

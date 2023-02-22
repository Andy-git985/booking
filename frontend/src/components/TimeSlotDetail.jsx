import { Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

const TimeSlotDetail = ({ available, selectPerson }) => {
  const handleClick = (id, email) => {
    selectPerson({ id, email, disabled: false });
  };
  return (
    <>
      <Stack spacing={2}>
        {available.map((person) => {
          return (
            <Item
              key={person.id}
              onClick={() => handleClick(person.id, person.email)}
            >
              {person.email}
            </Item>
          );
        })}
      </Stack>
    </>
  );
};

export default TimeSlotDetail;

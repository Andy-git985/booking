import { Paper, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { theme } from '../styles/styles';

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

const selectedStyle = {
  outline: `solid ${theme.palette.secondary.light}`,
};

const TimeSlotDetail = ({ available, selectPerson }) => {
  const [selection, setSelection] = useState(
    available.map((a) => ({ ...a, selected: false })) || []
  );
  const handleClick = (id, name, email) => {
    setSelection(
      selection.map((s) =>
        s.id === id ? { ...s, selected: true } : { ...s, selected: false }
      )
    );
    selectPerson({ id, name, email, disabled: false });
  };

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" align="center">
          Available Barbers
        </Typography>
        {selection.map((person) => {
          return (
            <Box key={person.id}>
              <Item
                onClick={() =>
                  handleClick(person.id, person.firstName, person.email)
                }
                style={person.selected ? selectedStyle : null}
              >
                <Avatar
                  alt={person.firstName}
                  src={person.image}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant="body1">{person.firstName}</Typography>
              </Item>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
};

export default TimeSlotDetail;

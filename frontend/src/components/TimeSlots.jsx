import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

const TimeSlots = ({ timeSlots, reserveTime }) => {
  const handleClick = (id) => {
    reserveTime({ id, disabled: false });
  };

  // reserving classes page

  return (
    <>
      <Grid container>
        {timeSlots.map((slot, index) => (
          <Grid item key={slot.id}>
            <Item onClick={() => handleClick(slot.id)}>
              {slot.time} {slot.slots} slot left
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default TimeSlots;

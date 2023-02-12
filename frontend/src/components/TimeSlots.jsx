import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

const TimeSlots = ({ timeSlots, reserveTime }) => {
  const handleClick = (time) => {
    reserveTime({ time, disabled: false });
  };

  return (
    <>
      <Grid container>
        {timeSlots.map((slot, index) => (
          <Grid item key={`${slot.time}-${index}`}>
            <Item onClick={() => handleClick(slot.time)}>
              {slot.time} {slot.slots} slot left
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default TimeSlots;

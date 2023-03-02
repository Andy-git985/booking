import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import date from '../services/date';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const TimeSlots = ({ timeSlots, reserveTime }) => {
  const handleClick = (id) => {
    reserveTime({ id, disabled: false });
  };

  // reserving classes page

  return (
    <>
      <Grid container spacing={1}>
        {timeSlots.map((slot) => (
          <Grid item key={slot.id}>
            <Item onClick={() => handleClick(slot.id)}>
              {date.time(slot.time)} {slot.available.length}
              {slot.available.length > 1 ? ' slots ' : ' slot '}
              left
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default TimeSlots;

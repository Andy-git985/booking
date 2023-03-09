import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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
    reserveTime(id);
  };

  // reserving classes page

  return (
    <Box>
      <Typography variant="h6" align="center">
        Times Available
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        {timeSlots.map((slot) => (
          <Grid item key={slot.id}>
            <Item onClick={() => handleClick(slot.id)}>
              <Typography variant="body1">
                {date.dateShort(slot.date)} {date.time(slot.time)}{' '}
                {slot.available.length}
                {slot.available.length > 1 ? ' slots ' : ' slot '}
                left
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default TimeSlots;

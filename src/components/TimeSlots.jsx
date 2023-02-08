import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { logDOM } from '@testing-library/react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TimeSlots = ({ timeSlots }) => {
  console.log(timeSlots);
  return (
    <>
      <Grid container>
        {timeSlots.map((slot) => (
          <Grid item>
            <Item>
              {slot.time} {slot.slots} slot left
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default TimeSlots;

import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import TimeSlots from './components/TimeSlots';
import scheduleServices from './services/schedule';

export default function App() {
  const [schedule, setSchedule] = useState([]);
  const [guest, setGuest] = useState(1);
  const [date, setDate] = useState(dayjs().format('MM/DD/YYYY'));

  const handleDateChange = (newDate) => {
    // console.log(newDate.target.name);
    setDate(newDate.format('MM/DD/YYYY'));
  };

  useEffect(() => {
    const getSchedule = async () => {
      const response = await scheduleServices.getSchedule();
      setSchedule(response);
    };
    getSchedule();
  }, []);

  const classesAvailable = date ? schedule.find((d) => d.date === date) : null;

  const timeSlotsAvailable = classesAvailable
    ? classesAvailable.classes.filter((c) => c.slots >= guest)
    : null;

  return (
    <Container>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ width: 150 }}>
          <InputLabel>Guests</InputLabel>
          <Select
            label="Guest"
            value={guest}
            onChange={(event) => setGuest(event.target.value)}
          >
            <MenuItem value={1}>One Guest</MenuItem>
            <MenuItem value={2}>Two Guests</MenuItem>
            <MenuItem value={3}>Three Guests</MenuItem>
            <MenuItem value={4}>Four Guests</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            {/* <MobileDatePicker
              label="Date mobile"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            /> */}
          </Stack>
        </LocalizationProvider>
      </Box>
      {timeSlotsAvailable ? (
        <TimeSlots timeSlots={timeSlotsAvailable} />
      ) : (
        <div>No matches</div>
      )}
    </Container>
  );
}

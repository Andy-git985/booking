import { useEffect, useLayoutEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  Button,
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
import ReserveDialog from './components/ReserveDialog';

export default function App() {
  const [schedule, setSchedule] = useState([]);
  // const [guest, setGuest] = useState(1);
  // const [date, setDate] = useState(dayjs().format('MM/DD/YYYY'));
  const [search, setSearch] = useState({
    guest: 1,
    date: dayjs().format('MM/DD/YYYY'),
  });
  const [time, setTime] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const getSchedule = async () => {
      const response = await scheduleServices.getSchedule();
      setSchedule(response);
    };
    getSchedule();
  }, []);

  const handleGuestChange = (newGuests) => {
    const newSearch = { ...search, guest: newGuests };
    setSearch(newSearch);
  };

  const handleDateChange = (newDate) => {
    const newSearch = { ...search, date: newDate.format('MM/DD/YYYY') };
    setSearch(newSearch);
  };

  const selectTime = (obj) => {
    console.log(obj);
    setDisabled(obj.disabled);
    setTime(obj.time);
  };

  console.log(disabled);
  console.log(time);

  const timeSlotsAvailable = schedule
    .find((d) => d.date === search.date)
    ?.classes.filter((c) => c.slots >= search.guest);

  // const classesAvailable = search.date
  //   ? schedule.find((d) => d.date === search.date)
  //   : null;

  // const timeSlotsAvailable = classesAvailable
  //   ? classesAvailable.classes.filter((c) => c.slots >= search.guest)
  //   : null;

  return (
    <Container>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ width: 150 }}>
          <InputLabel>Guests</InputLabel>
          <Select
            label="Guest"
            value={search.guest}
            onChange={(event) => handleGuestChange(event.target.value)}
          >
            <MenuItem value={1}>1 Guest</MenuItem>
            <MenuItem value={2}>2 Guests</MenuItem>
            <MenuItem value={3}>3 Guests</MenuItem>
            <MenuItem value={4}>4 Guests</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={search.date}
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
        <TimeSlots timeSlots={timeSlotsAvailable} reserveTime={selectTime} />
      ) : (
        <div>No matches</div>
      )}
      <ReserveDialog
        disabled={disabled}
        date={search.date}
        time={time}
        guest={search.guest}
      />
    </Container>
  );
}

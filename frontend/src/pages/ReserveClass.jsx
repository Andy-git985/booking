import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import TimeSlots from '../components/TimeSlots';
import scheduleServices from '../services/schedule';
import ReserveDialog from '../components/ReserveDialog';
import { reserveAppointment } from '../features/scheduleSlice';

const ReserveClass = () => {
  // const [schedule, setSchedule] = useState([]);
  const [alert, setAlert] = useState('');
  const { error } = useSelector(({ schedule }) => schedule);
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    guest: 1,
    date: dayjs().format('YYYY-MM-DD'),
  });
  const [selectedSlot, setSelectedSlot] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleGuestChange = (newGuests) => {
    const newSearch = { ...search, guest: newGuests };
    setSearch(newSearch);
  };

  const handleDateChange = (newDate) => {
    const newSearch = {
      ...search,
      date: newDate.format('YYYY-MM-DD'),
    };
    setSearch(newSearch);
  };

  const handleReserve = async (obj) => {
    const id = `${obj.id}`;
    const date = `${obj.date}T05:00:00Z`;
    dispatch(reserveAppointment({ id, date }));
  };

  const selectTime = (obj) => {
    setDisabled(obj.disabled);
    setSelectedSlot({ id: obj.id, time: obj.time });
  };

  const { appointments } = useSelector(({ schedule }) => schedule);
  const timeSlotsAvailable = appointments
    .find((a) => dayjs(a.date).format('YYYY-MM-DD') === search.date)
    ?.classes.filter((c) => c.slots >= search.guest);

  return (
    <Container>
      {error && <div>{error}</div>}
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
        handleReserve={handleReserve}
        search={search}
        selectedSlot={selectedSlot}
      />
    </Container>
  );
};

export default ReserveClass;

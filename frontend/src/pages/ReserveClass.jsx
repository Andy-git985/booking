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
import { reserveAppointment } from '../features/scheduleSlice';
import appointmentServices from '../services/appointment';
import ReserveDialog from '../components/ReserveDialog';
import TimeSlots from '../components/TimeSlots';
import TimeSlotDetail from '../components/TimeSlotDetail';
import scheduleServices from '../services/schedule';
import date from '../services/date';

const ReserveClass = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    guest: 1,
    date: date.currentDate(),
  });
  const [disabled, setDisabled] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const { appointments } = useSelector(({ schedule }) => schedule);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    setTimeSlots(
      appointments.filter(
        (a) =>
          date.dateDash(a.date) === search.date &&
          a.available.length >= search.guest
      )
    );
    setSelectedSlot('');
    setSelectedPerson('');
  }, [appointments, search.date, search.guest]);

  const handleGuestChange = (newGuests) => {
    const newSearch = { ...search, guest: newGuests };
    setSearch(newSearch);
  };

  const handleDateChange = (newDate) => {
    const newSearch = {
      ...search,
      date: date.dateDash(newDate),
    };
    setSearch(newSearch);
  };

  const selectTime = (obj) => {
    setSelectedSlot(timeSlots.find((slot) => slot.id === obj.id));
  };

  const selectPerson = (obj) => {
    setDisabled(obj.disabled);
    setSelectedPerson({ id: obj.id, email: obj.email });
  };

  const handleReserve = async (obj) => {
    try {
      let modifiedSchedule;
      const { date, time } = selectedSlot;
      const employee = selectedPerson.id;
      const newAppt = await appointmentServices.createNew({
        date,
        time,
        employee,
      });
      // dispatch in individual users in features
      if (newAppt.success) {
        // 1. schedule remove employee
        // 2. add appt to schedule.appointments(appt.id)
        // id is date in params.id
        // appointment is appt.id
        // employee is user.id to remove
        modifiedSchedule = await dispatch(
          reserveAppointment({
            id: obj.id,
            appointment: newAppt.data.id,
            employee,
          })
        ).unwrap();
      }
      if (modifiedSchedule.success) {
        const response = await scheduleServices.sendConfirmation({
          receiver: '',
        });
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
    // notification reducer show successful message
  };

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
      {timeSlots ? (
        <>
          <TimeSlots timeSlots={timeSlots} reserveTime={selectTime} />
        </>
      ) : (
        <div>No matches</div>
      )}
      {selectedSlot && (
        <TimeSlotDetail
          available={selectedSlot.available}
          selectPerson={selectPerson}
        />
      )}
      <ReserveDialog
        disabled={disabled}
        handleReserve={handleReserve}
        search={search}
        selectedPerson={selectedPerson}
        selectedSlot={selectedSlot}
      />
    </Container>
  );
};

export default ReserveClass;

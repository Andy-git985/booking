import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { reserveAppointment } from '../features/scheduleSlice';
import appointmentServices from '../services/appointment';
import DatePicker from '../components/DatePicker';
import Loading from '../components/Loading';
import ReserveDialog from '../components/ReserveDialog';
import TimeSlots from '../components/TimeSlots';
import TimeSlotDetail from '../components/TimeSlotDetail';
import scheduleServices from '../services/schedule';
import date from '../services/date';

const ReserveClass = () => {
  const dispatch = useDispatch();
  const schedule = useSelector(({ schedule }) => schedule);
  const [search, setSearch] = useState({
    guest: 1,
    date: date.currentDate(),
  });
  const [disabled, setDisabled] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    // if (Array.isArray(schedule.data) && schedule.data.length !== 0) {
    if (schedule.data.length) {
      const searchSlots = schedule?.data.filter(
        (a) =>
          date.dateDash(a.date) === date.dateDash(search.date) &&
          a.available.length >= search.guest
      );
      setTimeSlots(searchSlots);
      setSelectedSlot('');
      setSelectedPerson('');
    }
  }, [schedule.data, search.date, search.guest]);

  if (schedule.isLoading) {
    return <Loading />;
  }

  const handleGuestChange = (newGuests) => {
    const newSearch = { ...search, guest: newGuests };
    setSearch(newSearch);
  };

  const handleDateChange = (newDate) => {
    const newSearch = {
      ...search,
      date: newDate,
    };
    setSearch(newSearch);
  };

  const selectTime = (id) => {
    setSelectedSlot(timeSlots.find((slot) => slot.id === id));
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
      if (newAppt.success) {
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
        setSelectedSlot('');
        setSelectedPerson('');
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
        {/* <DatePicker date={search.date} handleDateChange={handleDateChange} /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={search.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            sx={{
              outline: 'solid red',
              display: { xs: 'block', md: 'none' },
            }}
          />

          <DateCalendar
            value={search.date}
            onChange={handleDateChange}
            sx={{
              outline: 'solid red',
              display: { xs: 'none', md: 'block' },
            }}
          />
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
        date={search.date}
        person={selectedPerson}
        selectedSlot={selectedSlot}
      />
    </Container>
  );
};

export default ReserveClass;

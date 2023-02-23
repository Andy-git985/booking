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

const ReserveClass = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    guest: 1,
    date: dayjs().format('YYYY-MM-DD'),
  });
  const [disabled, setDisabled] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const { appointments } = useSelector(({ schedule }) => schedule);
  const timeSlotsAvailable = appointments.filter(
    (a) =>
      dayjs(a.date).format('YYYY-MM-DD') === search.date &&
      a.available.length >= search.guest
  );

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

  const selectTime = (obj) => {
    setSelectedSlot(timeSlotsAvailable.find((slot) => slot.id === obj.id));
  };

  const selectPerson = (obj) => {
    setDisabled(obj.disabled);
    setSelectedPerson({ id: obj.id, email: obj.email });
  };

  const handleReserve = async (obj) => {
    // console.log(obj);
    // // const id = `${obj.id}`;
    // // const date = `${obj.date}T05:00:00Z`;
    // dispatch(reserveAppointment({ id: obj.id, person: obj.person }));
    // setSelectedSlot(selectedSlot);

    // id is the schedule id date
    // person is the employee
    console.log(search, selectedSlot, obj);
    const { date, time } = selectedSlot;
    console.log(date, time);
    const employee = obj.person;
    const newAppt = await appointmentServices.createNew({
      date,
      time,
      employee,
    });
    console.log(newAppt);

    // client and employee users both
    // userservice add appt
    // user controllers add appt,
    // find user by id: request.user
    // user.appointments push newAppt.id

    // schedule remove employee
    // add appt

    // notification reducer show successful message

    // try {k
    //   const modifiedSchedule = await dispatch(
    //     reserveAppointment({ id: obj.id, person: obj.person })
    //   ).unwrap();
    //   console.log('modifiedSchedule', modifiedSchedule);
    //   // if (modifiedSchedule.success) {
    //   //   // do something else
    //   // }
    //   setSelectedSlot(selectedSlot);
    // } catch (error) {
    //   console.log(error);
    // }
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
      {timeSlotsAvailable ? (
        <>
          <TimeSlots timeSlots={timeSlotsAvailable} reserveTime={selectTime} />
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

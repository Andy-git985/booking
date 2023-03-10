import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelAppt,
  endRescheduling,
  reserveAppt,
} from '../features/appointmentSlice';
import { reserveAppointment } from '../features/scheduleSlice';
import DatePicker from '../components/DatePicker';
import Loading from '../components/Loading';
import ReserveDialog from '../components/ReserveDialog';
import TimeSlots from '../components/TimeSlots';
import TimeSlotDetail from '../components/TimeSlotDetail';
import scheduleServices from '../services/schedule';
import dateServices from '../services/date';
import chair from '../assets/images/jay-huang-aZBQB-uYosc-unsplash.jpg';
import pole from '../assets/images/tim-mossholder-q49oU8NeOHQ-unsplash.jpg';
import { FormControlLabel } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { theme } from '../styles/styles';

const ReserveClass = () => {
  const dispatch = useDispatch();
  const schedule = useSelector(({ schedule }) => schedule);
  const appointment = useSelector(({ appointment }) => appointment);
  const { userDetails } = useSelector(({ user }) => user);
  const { employees } = useSelector(({ user }) => user);
  const location = useLocation();
  const [search, setSearch] = useState({
    employee: 'any',
    date: dateServices.currentDate(),
  });
  const [checked, setChecked] = useState(false);
  const [dateDisabled, setDateDisabled] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [timeSlots, setTimeSlots] = useState('');

  useEffect(() => {
    if (location.state?.employee) {
      const newSearch = {
        ...search,
        employee: location.state?.employee,
      };
      setSearch(newSearch);
    }
  }, [location.state?.employee]);

  useEffect(() => {
    if (schedule.data.length > 0) {
      let searchSlots = schedule?.data;
      const { date, employee } = search;
      if (employee !== 'any' && dateDisabled !== true) {
        searchSlots = schedule?.data.filter(
          (d) =>
            d.available.filter(
              (availablePerson) => availablePerson.id === employee
            ).length &&
            dateServices.dateDash(d.date) === dateServices.dateDash(date)
        );
      }
      if (employee !== 'any' && dateDisabled === true) {
        searchSlots = schedule?.data.filter(
          (d) =>
            d.available.filter(
              (availablePerson) => availablePerson.id === employee
            ).length
        );
      }
      if (employee === 'any' && dateDisabled !== true) {
        searchSlots = schedule?.data.filter(
          (d) => dateServices.dateDash(d.date) === dateServices.dateDash(date)
        );
      }
      setTimeSlots(searchSlots);
      setSelectedSlot('');
      setSelectedPerson('');
    }
  }, [schedule.data, dateDisabled, search]);

  if (schedule.isLoading) {
    return <Loading />;
  }

  const handleSwitchChange = () => {
    setDisabled(true);
    setChecked(!checked);
    setDateDisabled(!dateDisabled);
  };

  const handleDateChange = (newDate) => {
    setDisabled(true);
    const newSearch = {
      ...search,
      date: newDate,
    };
    setSearch(newSearch);
  };

  const handleEmployeeChange = (employee) => {
    const newSearch = { ...search, employee };
    setSearch(newSearch);
  };

  const selectTime = (id) => {
    setSelectedSlot(timeSlots.find((slot) => slot.id === id));
  };

  const selectPerson = (obj) => {
    setDisabled(obj.disabled);
    setSelectedPerson({ id: obj.id, name: obj.name, email: obj.email });
  };

  const reserveDialog = {
    button: 'Reserve Now',
    title: 'Would you like to reserve this appointment?',
    content: `With ${selectedPerson.name} on ${dateServices.dateHyphen(
      selectedSlot.date
    )} on ${dateServices.time(selectedSlot.time)}?`,
  };

  const handleReserve = async () => {
    try {
      let reserveEmployee;
      let emailTemplate;
      const { date, time } = selectedSlot;
      const employee = selectedPerson.id;
      const newAppt = await dispatch(
        reserveAppt({
          date,
          time,
          employee,
        })
      ).unwrap();
      if (newAppt.success) {
        reserveEmployee = await dispatch(
          reserveAppointment({
            id: selectedSlot.id,
            appointment: newAppt.data.id,
            employee,
          })
        ).unwrap();
        setSelectedSlot('');
        setSelectedPerson('');
      }
      if (reserveEmployee.success && appointment.rescheduling) {
        // emailTemplate = cancel and reschedule template
        const idToBeDeleted = appointment.idToBeDeleted;
        const cancelledAppt = await dispatch(
          cancelAppt(idToBeDeleted)
        ).unwrap();
        if (cancelledAppt.success) {
          dispatch(endRescheduling());
        }
      }
      if (reserveEmployee.success) {
        const response = await scheduleServices.sendConfirmation({
          receiver: userDetails.email,
          employee: selectedPerson.name,
          date: dateServices.dateHyphen(selectedSlot.date),
          time: dateServices.time(selectedSlot.time),
        });
        console.log('email response', response);
        setSelectedSlot('');
        setSelectedPerson('');
      }
    } catch (error) {
      console.error(error);
    }
    // notification reducer show successful message
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        align="center"
        sx={{ mb: 5 }}
      >
        Schedule your appointment
      </Typography>
      <Grid container spacing={6}>
        <Grid item sm={12} sx={{ display: { sm: 'block', md: 'none' } }}>
          <Card>
            <CardMedia
              component="img"
              image={pole}
              alt="barbershop pole"
              sx={{
                aspectRatio: '16 / 9',
              }}
            ></CardMedia>
          </Card>
        </Grid>
        <Grid item sm={12} md={6}>
          <Container>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // flexDirection: { sm: 'row', md: 'column' },
                alignItems: 'center',
                gap: 1,
                mb: 3,
              }}
            >
              <FormControl
                sx={{
                  width: '100%',
                }}
              >
                <InputLabel>Choose a barber</InputLabel>
                <Select
                  label="Barber"
                  value={search.employee}
                  fullWidth
                  onChange={(event) => handleEmployeeChange(event.target.value)}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  <MenuItem value="any">No preference</MenuItem>
                  {employees.map((employee) => {
                    return (
                      <MenuItem value={employee.id} key={employee.id}>
                        {employee.firstName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControlLabel
                checked={checked}
                control={<Switch />}
                label="Any Date"
                onChange={handleSwitchChange}
              />
              <DatePicker
                date={search.date}
                handleDateChange={handleDateChange}
                dateDisabled={dateDisabled}
              />
            </Box>
            {timeSlots.length ? (
              <>
                <TimeSlots timeSlots={timeSlots} reserveTime={selectTime} />
              </>
            ) : (
              <Typography variant="h6" sx={{ mb: 2 }}>
                No matches
              </Typography>
            )}
            {selectedSlot && (
              <TimeSlotDetail
                available={selectedSlot.available}
                selectPerson={selectPerson}
              />
            )}
            <ReserveDialog
              disabled={disabled}
              dialog={reserveDialog}
              handler={handleReserve}
            />
          </Container>
        </Grid>
        <Grid item md={6} sx={{ display: { sm: 'none', md: 'block' } }}>
          <Card>
            <CardMedia
              component="img"
              image={chair}
              alt="chair in an barbershop"
              sx={{
                aspectRatio: '9 / 16',
              }}
            ></CardMedia>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReserveClass;

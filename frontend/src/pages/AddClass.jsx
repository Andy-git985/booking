import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
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
import TimeCheckBox from '../components/TimeCheckBox';
import scheduleServices from '../services/schedule';
import { useDispatch } from 'react-redux';
import { addNewAppointments } from '../features/scheduleSlice';

const AddClass = () => {
  const [date, setDate] = useState(dayjs());
  const dispatch = useDispatch();

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  // obj is an array of times key value
  const addClasses = async (obj) => {
    // delete slots, clean up obj later
    // obj.forEach((o) => {
    //   delete o.slots;
    // });
    const apptsForDate = obj.map((o) => {
      // add date field to each appointment
      return {
        ...o,
        date: `${dayjs(date).format('YYYY-MM-DD')}T00:00:00-05:00`,
      };
    });

    // const response = await scheduleServices.createNew(apptsForDate);
    // console.log(response);

    dispatch(addNewAppointments(apptsForDate));

    // old code
    // const newClasses = {
    //   date: `${dayjs(date).format('YYYY-MM-DD')}T00:00:00-05:00`,
    //   classes: obj,
    // };
  };

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={handleChange}
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
      <TimeCheckBox
        date={date.format('YYYY-MM-DD')}
        createClasses={addClasses}
      />
    </Container>
  );
};

export default AddClass;

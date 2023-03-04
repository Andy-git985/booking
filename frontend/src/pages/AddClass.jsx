import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
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
import DatePicker from '../components/DatePicker';
import TimeCheckBox from '../components/TimeCheckBox';
import scheduleServices from '../services/schedule';
import { useDispatch } from 'react-redux';
import { addNewSchedule } from '../features/scheduleSlice';
import dateServices from '../services/date';

const AddClass = () => {
  const [date, setDate] = useState(dateServices.currentDate());
  const dispatch = useDispatch();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // obj is an array of times key value
  const addClasses = async (obj) => {
    const apptsForDate = obj.map((o) => {
      return {
        ...o,
        date: dateServices.convertEST(date),
      };
    });
    dispatch(addNewSchedule(apptsForDate));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px',
          mt: '8px',
          padding: 2,
        }}
      >
        <DatePicker date={date} handleDateChange={handleDateChange} />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider> */}
        <TimeCheckBox
          date={dateServices.dateDash(date)}
          createClasses={addClasses}
        />
      </Box>
    </Container>
  );
};

export default AddClass;

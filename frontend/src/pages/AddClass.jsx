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

const AddClass = () => {
  const [date, setDate] = useState(dayjs().format('MM/DD/YYYY'));

  const handleChange = (newDate) => {
    setDate(newDate.format('MM/DD/YYYY'));
  };

  const addClasses = async (obj) => {
    obj.forEach((o) => {
      delete o.id;
    });
    const newClasses = { date, classes: obj };
    const response = await scheduleServices.createNew(newClasses);
    console.log(response);
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
      <TimeCheckBox date={date} createClasses={addClasses} />
    </Container>
  );
};

export default AddClass;

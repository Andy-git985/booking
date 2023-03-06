import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateField } from '@mui/x-date-pickers/DateField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const DatePicker = ({ date, handleDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label="Pick a date"
        format="MM/DD/YYYY"
        value={date}
        onChange={handleDateChange}
        sx={{
          width: '100%',
          display: { xs: 'block', md: 'none' },
        }}
      />
      <DateCalendar
        value={date}
        onChange={handleDateChange}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;

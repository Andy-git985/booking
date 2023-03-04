import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateField } from '@mui/x-date-pickers/DateField';

const DatePicker = ({ date, handleDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        label="Pick a date"
        format="MM/DD/YYYY"
        value={date}
        onChange={handleDateChange}
        sx={{
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

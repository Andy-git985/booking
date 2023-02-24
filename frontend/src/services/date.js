import dayjs, { Dayjs } from 'dayjs';

const currentDate = () => dayjs().format('YYYY-MM-DD');

const formatToDate = (date) => dayjs(date).format('YYYY-MM-DD');

const formatToTime = (date) => dayjs(date).format('h:mma');

export default { currentDate, formatToDate, formatToTime };

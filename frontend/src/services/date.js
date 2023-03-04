import dayjs, { Dayjs } from 'dayjs';

const currentDate = () => dayjs();

const dateDash = (date) => dayjs(date).format('YYYY-MM-DD');

const dateHyphen = (date) => dayjs(date).format('MM/DD/YYYY');

const time = (date) => dayjs(date).format('h:mma');

export default { currentDate, dateDash, dateHyphen, time };

import axios from 'axios';

const baseUrl = 'http://localhost:3001/schedule';

const getSchedule = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const reserveTime = async () => {
  const response = await axios.put(baseUrl);
  return response.data;
};

export default { getSchedule };

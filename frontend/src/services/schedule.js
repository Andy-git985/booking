import axios from 'axios';

const baseUrl = '/api/schedule';

const getSchedule = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (obj) => {
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const reserveTime = async () => {
  const response = await axios.put(baseUrl);
  return response.data;
};

export default { getSchedule, createNew };

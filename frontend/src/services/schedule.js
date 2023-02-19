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

const reserveTime = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};

const sendConfirmation = async () => {
  const response = await axios.post(`${baseUrl}/confirmation`);
  return response.data;
};

export default { getSchedule, createNew, reserveTime, sendConfirmation };

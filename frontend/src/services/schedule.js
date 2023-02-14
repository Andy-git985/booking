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

const reserveTime = async (id, time) => {
  const response = await axios.put(`${baseUrl}/${id}`, time);
  return response;
};

export default { getSchedule, createNew, reserveTime };

import axios from 'axios';

const baseUrl = '/api/appointment';

const createNew = async (obj) => {
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const getUser = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { createNew, getUser };

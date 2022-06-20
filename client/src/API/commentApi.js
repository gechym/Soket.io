import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getComments = async (id) => {
  const res = await request.get(`/comments/${id}`);
  return res.data;
};

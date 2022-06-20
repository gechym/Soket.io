import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getComments = async (id, opt) => {
  const res = await request.get(`/comments/${id}`, opt);
  return res.data;
};

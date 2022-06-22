import axios from 'axios';

export const getComments = async (id, opt) => {
  const res = await axios.get(`/comments/${id}`, opt);
  return res.data;
};

import axios from 'axios';

export const getComments = async (id, opt) => {
  const res = await axios.get(`/api/v1/comments/${id}`, opt);
  return res.data;
};

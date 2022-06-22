import axios from 'axios';

export const getProduct = async () => {
  const res = await axios.get(`/products`);
  return res.data;
};

export const ratingProduct = async (id, data) => {
  const res = await axios.patch(`/products/${id}`, data);
  return res.data;
};

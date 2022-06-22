import axios from 'axios';

export const getProduct = async () => {
  const res = await axios.get(`/api/v1/products`);
  return res.data;
};

export const ratingProduct = async (id, data) => {
  const res = await axios.patch(`/api/v1/products/${id}`, data);
  return res.data;
};

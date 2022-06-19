import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getProduct = async () => {
  const res = await request.get(`/products`);
  return res.data;
};

export const ratingProduct = async (id, data) => {
  const res = await request.patch(`/products/${id}`, data);
  return res.data;
};

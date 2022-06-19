import * as productConst from '~/Redux/constant/ProductConst';

// Fetch Users
export const fetch_request = (socket) => {
  return { type: productConst.fetch_request, payload: socket };
};

export const fetch_success = (products) => {
  return { type: productConst.fetch_success, payload: products };
};

export const fetch_error = (err) => {
  return { type: productConst.fetch_error, payload: err };
};

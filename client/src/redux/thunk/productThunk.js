import * as API from '~/API/productApi';
import * as productAction from '~/redux/actions/productAction';

export const getProducts = (socket) => async (dispatch) => {
  dispatch(productAction.fetch_request(socket));
  try {
    const res = await API.getProduct();
    dispatch(productAction.fetch_success(res));
  } catch (error) {
    if (error.response?.data.message) {
      dispatch(productAction.fetch_error(error.response?.data.message));
    } else {
      dispatch(productAction.fetch_error(error.message));
    }
  }
};

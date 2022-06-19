import * as API from '~/API/productApi';
import * as productAction from '~/redux/actions/productAction';

export const getProducts = (id) => async (dispatch) => {
  console.log(id);
  dispatch(productAction.fetch_request());
  try {
    const res = await API.getProduct();
    dispatch(productAction.fetch_success(res));
  } catch (error) {
    dispatch(productAction.fetch_error(error.message));
  }
};

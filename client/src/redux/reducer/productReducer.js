import * as productConst from '../constant/ProductConst';

const initialState = {
  data: [],
  loading: false,
  error: undefined,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConst.fetch_success:
      const newState = {
        ...state,
        loading: false,
        error: undefined,
        data: action.payload,
      };
      return newState;

    case productConst.fetch_request:
      return {
        ...state,
        loading: true,
      };

    case productConst.fetch_error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;

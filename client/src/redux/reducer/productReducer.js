import * as productConst from '../constant/ProductConst';

const initialState = {
  data: undefined,
  loading: false,
  error: undefined,
  socket: undefined,
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
        socket: action.payload,
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

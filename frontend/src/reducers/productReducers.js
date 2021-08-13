import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
} from '../constants/productConstants';

const initialListState = {
  products: [],
};

export const productListReducer = (state = initialListState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        products: [],
        error: payload,
      };

    default:
      return state;
  }
};

const initialDetailsState = {
  product: {
    reviews: [],
  },
};

export const productDetailsReducer = (state = initialDetailsState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

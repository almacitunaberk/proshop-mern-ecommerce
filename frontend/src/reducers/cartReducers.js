import { CARD_ADD_ITEM, CARD_REMOVE_ITEM, CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [item, ...state.cartItems],
        };
      }
    default:
      return state;
  }
};

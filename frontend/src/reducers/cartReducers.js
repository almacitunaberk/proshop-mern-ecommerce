import { CARD_ADD_ITEM, CARD_REMOVE_ITEM, CART_ADD_ITEM } from '../constants/cartConstants';

const initialCartState = {
  cartItems: [],
};

export const cartReducer = (state = initialCartState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find((x) => x.product === payload.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => (item.product === existItem.product ? payload : item)),
        };
      } else {
        return {
          ...state,
          cartItems: [payload, ...state.cartItems],
        };
      }
  }
};

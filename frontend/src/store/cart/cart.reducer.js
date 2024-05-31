import { setIsCartOpen, setCartItems } from './cart.action';

export const cartReducer = (
  state = {
    isCartOpen: false,
    cartItems: [],
  },
  action = {}
) => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};

import { SET_ORDER_ID, REMOVE_ORDER_ID } from "../actions/cartOrderId";
import { ADD_ITEMS, REMOVE_ITEMS, CLEAR_ITEMS } from "../actions/cartItems";

let initial_state = "not_set";
export default (state = initial_state, action) => {
  switch (action.type) {
    case SET_ORDER_ID:
      return action.orderId;

    case REMOVE_ORDER_ID:
      return initial_state;

    case ADD_ITEMS:
      return "changed";

    case REMOVE_ITEMS:
      return "changed";

    case CLEAR_ITEMS:
      return initial_state;

    default:
      return state;
  }
};

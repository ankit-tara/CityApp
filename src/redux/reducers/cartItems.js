import {
  ADD_ITEMS,
  REMOVE_ITEM,
  FETCH_ITEMS,
  CLEAR_ITEMS
} from "../actions/cartItems";

let intial_state = [];
export default (state = intial_state, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      let itemExist = state.some(item => item.item.id == action.item.id);
      if (itemExist) {
        state.map(item => {
          console.log(item.item);
          console.log(action.item);
          if (item.item.id == action.item.id) {
            item.quantity++;
          }
        });
      } else {
        state.push({ item: action.item, quantity: action.quantity });
      }
      return state;

    case REMOVE_ITEM:
      return state;

    case FETCH_ITEMS:
      return state;

    case CLEAR_ITEMS:
      return intial_state;

    default:
      return state;
  }
};

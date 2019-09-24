export const ADD_ITEMS = "ADD_ITEMS";
export const REMOVE_ITEMS = "REMOVE_ITEMS";
export const FETCH_ITEMS = "FETCH_ITEMS";
export const CLEAR_ITEMS = "CLEAR_ITEMS";

export const addItems = (item, quantity) => ({
  type: ADD_ITEMS,
  item: item,
  quantity: quantity
});

export const removeItems = (item, quantity) => ({
  type: REMOVE_ITEMS,
  item: item,
  quantity: quantity
});

export const fetchItems = () => ({
  type: FETCH_ITEMS
});

export const clearItems = () => ({
  type: CLEAR_ITEMS
});

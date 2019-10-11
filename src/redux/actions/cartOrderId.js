export const SET_ORDER_ID = "SET_ORDER_ID";
export const REMOVE_ORDER_ID = "REMOVE_ORDER_ID";

export const setOrderId = orderId => ({
  type: SET_ORDER_ID,
  orderId: orderId
});

export const removeOrderId = () => ({
  type: REMOVE_ORDER_ID
});

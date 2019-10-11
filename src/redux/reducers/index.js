import { combineReducers } from 'redux'
import authLocation from './authLocation'
import locationLoading from './locationLoading'
import cartItems from './cartItems'
import authUser from './authUser'
import cartOrderId from "./cartOrderId";

export default combineReducers({
  authLocation,
  locationLoading,
  cartItems,
  authUser,
  cartOrderId
});

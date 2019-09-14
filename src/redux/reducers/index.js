import { combineReducers } from 'redux'
import authLocation from './authLocation'
import locationLoading from './locationLoading'
import cartItems from './cartItems'

export default combineReducers({
  authLocation,
  locationLoading,
  cartItems
});

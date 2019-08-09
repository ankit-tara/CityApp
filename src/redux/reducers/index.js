import { combineReducers } from 'redux'
import authLocation from './authLocation'
import locationLoading from './locationLoading'

export default combineReducers({
	authLocation,
	locationLoading
})

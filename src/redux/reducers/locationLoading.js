import { LOCATION_LOADING_START, LOCATION_LOADING_STOP } from '../actions/locationLoading'

export default (state = false, action) => {
	switch (action.type) {
		case LOCATION_LOADING_START:
			return true

		case LOCATION_LOADING_STOP:
			return false
      
		default:
			return state
	}
}
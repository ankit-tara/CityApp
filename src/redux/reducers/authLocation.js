import Location from "../modals/Location";
import { SELECT_LOCATION, UNSELECT_LOCATION } from "../actions//authLocation";

export default (state = new Location(), action) => {
  switch (action.type) {
    case SELECT_LOCATION:
      let data = { ...action.locationData };
      console.log(data);
      return data;

    case UNSELECT_LOCATION:
      return new Location();

    default:
      return state;
  }
};

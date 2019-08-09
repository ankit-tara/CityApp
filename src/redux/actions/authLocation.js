export const SELECT_LOCATION = "SELECT_LOCATION";
export const UNSELECT_LOCATION = "UNSELECT_LOCATION";

export const selectLocation = (locationData) => ({
  type: SELECT_LOCATION,
  locationData: locationData
});
export const unselectLocation = () => ({ type: UNSELECT_LOCATION });

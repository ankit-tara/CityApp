export const LOCATION_LOADING_START = "LOCATION_LOADING_START";
export const LOCATION_LOADING_STOP = "LOCATION_LOADING_STOP";

export const locationLoadingStart = () => ({
  type: LOCATION_LOADING_START
});
export const locationLoadingStop = () => ({ type: LOCATION_LOADING_STOP });

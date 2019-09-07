import env from "react-native-config"
const API_HOST=env.API_HOST
const API_URL = env.API_URL;
const LOCATION_DATA="location_data"
const LAT_LNG="Lat_Lng"
const GOOGLE_MAP_API = env.GOOGLE_MAP_API_HOST;
const GOOGLE_MAP_API_KEY = env.GOOGLE_MAP_API_KEY;
export {
  API_HOST,
  LOCATION_DATA,
  GOOGLE_MAP_API,
  GOOGLE_MAP_API_KEY,
  LAT_LNG,
  API_URL
};
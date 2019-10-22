import {
  API_HOST,
  GOOGLE_MAP_API,
  GOOGLE_MAP_API_KEY,
  API_URL
} from "./constants";
const HOMEPAGE_ID = 340;
const SHOPPING_PAGE_ID = 1107;

/**
 * get location data
 */
export function getLocationData(value) {
  let url = `${GOOGLE_MAP_API}/geocode/json?latlng=${value}&key=${GOOGLE_MAP_API_KEY}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get homepage and its acf field data
 */
export function getHomePageData(city = "") {
  let url = `${API_HOST}/pages/${HOMEPAGE_ID}?city=${city}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}
/**
 * get shopping main page and its acf field data
 */
export function GetShoppingPageData() {
  let url = `${API_HOST}/pages/${SHOPPING_PAGE_ID}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get categories List
 */
export function getCategories(perpage = 10, currentpage = 1) {
  let url = `${API_HOST}/categories?per_page=${perpage}&page=${currentpage}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get categories List
 */
export function searchCategories(searchText, perpage = 10, currentpage = 1) {
  let url = `${API_HOST}/categories?search=${searchText}&per_page=${perpage}&page=${currentpage}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}
/**
 * get post List
 */
export function searchPost(
  searchText,
  city = "",
  perpage = 10,
  currentpage = 1
) {
  let url = `${API_HOST}/posts?search=${searchText}&per_page=${perpage}&page=${currentpage}&filter[category_name]=${city}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get post by category
 */
export function getPostByCategory(category, currentpage = 1, perpage = 10) {
  let url = `${API_HOST}/posts?categories=${category}&per_page=${perpage}&page=${currentpage}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}
/**
 * get post by tag
 */
export function getPostBytag(tag, city = "", currentpage = 1, perpage = 10) {
  let url = `${API_HOST}/posts?post_tag=${tag}&per_page=${perpage}&page=${currentpage}&filter[category_name]=${city}`;
  // let url = `${API_HOST}/posts?tags=${tag}&per_page=${perpage}&page=${currentpage}`
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get Tags List
 */
export function getTags(perpage = 10, currentpage = 1) {
  let url = `${API_HOST}/post_tag?per_page=${perpage}&page=${currentpage}`;
  // let url = `${API_HOST}/tags?per_page=${perpage}&page=${currentpage}`
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get Tags List
 */
export function searchTags(searchText, perpage = 10, currentpage = 1) {
  let url = `${API_HOST}/post_tag?search=${searchText}&per_page=${perpage}&page=${currentpage}`;
  // let url = `${API_HOST}/tags?search=${searchText}&per_page=${perpage}&page=${currentpage}`
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get Tags List
 */
export function searchGlobal(
  searchText = "",
  city = "",
  perpage = 10,
  currentpage = 1
) {
  let url = `${API_HOST}/search-global?s=${searchText}&city=${city}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get post by category
 */
export function getPostByCategoryName(name, currentpage = 1, perpage = 10) {
  let url = `${API_HOST}/posts?filter[category_name]=${name}&per_page=${perpage}&page=${currentpage}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get post by id
 */
export function getPostByID(id) {
  let url = `${API_HOST}/posts/${id}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get list place image
 */

export function getListPlaceImage(photoReference = "", width = 100) {
  if (!photoReference) return null;
  let url = `${GOOGLE_MAP_API}/place/photo?photoreference=${photoReference}&key=${GOOGLE_MAP_API_KEY}&maxwidth=${width}`;
  // console.log(url);
  return fetch(url)
    .then(data => data.url)
    .catch(error => {
      throw error;
    });
}

/**
 * get place details from place id
 */

export function getPlaceDetails(placeid = "") {
  if (!placeid) return null;
  let url = `${GOOGLE_MAP_API}/place/details/json?placeid=${placeid}&key=${GOOGLE_MAP_API_KEY}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get place nearby
 */

export function getNearbyPlaces(latlng = "", type = "") {
  if (!latlng) return null;
  let url = `${GOOGLE_MAP_API}/place/nearbysearch/json?type=${type}&location=${latlng}&radius=500&key=${GOOGLE_MAP_API_KEY}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * get paynow link
 */

export function getPayNowLink(order_id) {
  if (!order_id) return null;
  let url = `${API_HOST}/get-paynow-url?order_id=${order_id}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * user login
 */

export function getJwtLogin(email, password) {
  if (!email || !password) return null;
  let url = `${API_URL}/wp-json/jwt-auth/v1/token`;

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    mode: "cors",

    method: "POST",
    body: JSON.stringify({
      username: email,
      password: password
    })
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

/**
 * user login
 */

export function getUserRegister(email, password, username) {
  if (!email || !password) return null;
  let url = `${API_HOST}/users/register`;
  console.log(url);
  let data = JSON.stringify({
    username: username,
    email: email,
    password: password
  });
  console.log(data);
  let formdata = new FormData()
  formdata.append('email',email)
  formdata.append("username", username);
  formdata.append("password", password);
  console.log(formdata)
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    // mode: "cors",

    method: "POST",
    body: data
  })
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

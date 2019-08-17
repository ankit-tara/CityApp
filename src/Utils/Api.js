import { API_INITIAL } from "./constants"
const HOMEPAGE_ID = 340

/**
 * get location data
 */
export function getLocationData(value) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${value}&key=AIzaSyCa4gODgo6AsfiXx0HzeUI2C01kqla9Kyc`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}

/**
 * get homepage and its acf field data
 */
export function getHomePageData(city='') {
    let url = `${API_INITIAL}/pages/${HOMEPAGE_ID}?city=${city}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}

/**
 * get categories List
 */
export function getCategories(perpage=10,currentpage=1) {
    let url = `${API_INITIAL}/categories?per_page=${perpage}&page=${currentpage}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}

/**
 * get categories List
 */
export function searchCategories(searchText,perpage=10,currentpage=1) {
    let url = `${API_INITIAL}/categories?search=${searchText}&per_page=${perpage}&page=${currentpage}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}

/**
 * get post by category
 */
export function getPostByCategory(category,currentpage=1,perpage=10) {
    let url = `${API_INITIAL}/posts?categories=${category}&per_page=${perpage}&page=${currentpage}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}
/**
 * get post by tag
 */
export function getPostBytag(tag,currentpage=1,perpage=10) {
    let url = `${API_INITIAL}/posts?post_tag=${tag}&per_page=${perpage}&page=${currentpage}`
    // let url = `${API_INITIAL}/posts?tags=${tag}&per_page=${perpage}&page=${currentpage}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}

/**
 * get Tags List
 */
export function getTags(perpage=10,currentpage=1) {
    let url = `${API_INITIAL}/post_tag?per_page=${perpage}&page=${currentpage}`
    // let url = `${API_INITIAL}/tags?per_page=${perpage}&page=${currentpage}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}

/**
 * get Tags List
 */
export function searchTags(searchText,perpage=10,currentpage=1) {
    let url = `${API_INITIAL}/post_tag?search=${searchText}&per_page=${perpage}&page=${currentpage}`
    // let url = `${API_INITIAL}/tags?search=${searchText}&per_page=${perpage}&page=${currentpage}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}

/**
 * get Tags List
 */
export function searchGlobal(searchText='',city='',perpage=10,currentpage=1) {
    let url = `${API_INITIAL}/search-global?s=${searchText}&city=${city}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}

/**
 * get post by category
 */
export function getPostByCategoryName(name,currentpage=1,perpage=10) {
    let url = `${API_INITIAL}/posts?filter[category_name]=${name}&per_page=${perpage}&page=${currentpage}`
    console.log(url)
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}
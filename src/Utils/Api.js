import { API_INITIAL } from "./constants"
const HOMEPAGE_ID = 340

/**
 * get homepage and its acf field data
 */
export function getHomePageData() {
    let url = `${API_INITIAL}/pages/${HOMEPAGE_ID}`
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
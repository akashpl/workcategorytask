import { API } from "../config";
import queryString from 'query-string';

export const getProducts = (sortBy) => {
    return fetch(`${API}products?sortBy=${sortBy}&order=desc`, {
        method: "GET"

    })
        .then(response => {
            return response.json();

        })
        .catch(err => console.log(err))
};


export const getCategories = () => {
    return fetch(`${API}categories`, {
        method: "GET"

    })
        .then(response => {
            return response.json();

        })
        .catch(err => console.log(err))
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = { limit, skip, filters }

    return fetch(`${API}products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();

        })
        .catch(err => console.log(err))

}


export const list = params => {
    const query=queryString.stringify(params)
    return fetch(`${API}products/?${query}`,{
      
        method:'GET'

    

    })
        .then(response => {
            return response.json();

        })
        .catch(err => console.log(err))
};

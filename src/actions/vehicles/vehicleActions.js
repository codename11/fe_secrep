import { LIST_VEHICLES } from "../types";

export const get_vehicles = (data) => dispatch => {

    const url = "http://secrep.test/api/list_vehicles";
    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json',
            "Accept": 'application/json',
            "Authorization": "Bearer " + data.access_token
        },
        redirect: 'follow', // manual, *follow, error
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {
        
        dispatch({
            type: LIST_VEHICLES,
            payload: [...data.vehicles]
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
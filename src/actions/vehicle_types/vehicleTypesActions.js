import { LIST_VEHICLE_TYPES } from "../types";
import store from "../../store";

let auth = null;

export const get_vehicle_types = (data) => dispatch => {

    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/list_vehicle_pivot";
    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        },
        redirect: 'follow', // manual, *follow, erro
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {
        
        dispatch({
            type: LIST_VEHICLE_TYPES,
            payload: [...data.types]
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
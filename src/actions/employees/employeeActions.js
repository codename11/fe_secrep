import { LIST_EMPLOYEES} from "../types";
import store from "../../store";

let auth = null;

export const get_employees = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/list_employees";
    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        },
        body: JSON.stringify(data)
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {
        
        dispatch({
            type: LIST_EMPLOYEES,
            payload: [...data.employees]
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
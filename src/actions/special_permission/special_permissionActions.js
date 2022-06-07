import { LIST_PERMISSIONS } from "../types";
import store from "../../store";

let auth = null;

export const list_permissions = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/list_special_permissions";
    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        }
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {

        console.log("permissions: ", data);
        if(data && data.specialPermission && data.specialPermission.length>0){
            dispatch({
                type: LIST_PERMISSIONS,
                payload: [...data.specialPermission]
            });
        }
        else{
            console.log("prazno");
        }
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
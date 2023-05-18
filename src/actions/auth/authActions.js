import { REGISTER, LOGIN, LOGIN_TAB, LOGOUT, VEHICLES_TAB} from "../types";

export const register = (data) => dispatch => {
    
    const url = "http://secrep.test/api/register";
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {
        
        dispatch({
            type: REGISTER,
            payload: data
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const login = (data) => dispatch => {

    let url = "http://secrep.test/api/login";

    fetch(url, {
        method: 'POST',
        crossDomain : true,
        headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then((response) => {

        return response.json();

    })
    .then((data) => {
        
        dispatch({
            type: LOGIN,
            payload: data
        });

        dispatch({
            type: VEHICLES_TAB,
            payload: "vehicles_tab"
        });

    })
    .catch((error) => {
            console.error('Error:', error);
    });

}

export const logout = (data) => dispatch => {

    let url = "http://secrep.test/api/logout";

    fetch(url, {
        method: 'POST',
        crossDomain : true,
        headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        },
    })
    .then((response) => {

        return response.json();

    })
    .then((data) => {
        
        dispatch({
            type: LOGIN_TAB,
            payload: "login_tab"
        });
    
        dispatch({
            type: LOGOUT,
            payload: {
                user: null,
                access_token: null,
                vehicles: null
            }
        });
        console.log("Logged Out! ", data);

    })
    .catch((error) => {
            console.error('Error:', error);
    });

}
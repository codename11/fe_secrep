import { LIST_VEHICLES, LIST_EMPLOYEES, LIST_DELIVERIES, LIST_USERS } from "../types";
import store from "../../store";

let auth = null;

export const get_vehicles = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/vehicles";
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        },
        body: JSON.stringify(data)
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {
        console.log("customVehicles: ", data);

        if(data && data.vehicles && data.vehicles.length>0){

            dispatch({
                type: LIST_VEHICLES,
                payload: [...data.vehicles]
            });

        }
        else if(data && data.vehicles && data.vehicles.length===1){

            dispatch({
                type: LIST_VEHICLES,
                payload: [data.vehicles]
            });

        }
        else if(data && data.vehicles && data.vehicles.length===0){

            dispatch({
                type: LIST_VEHICLES,
                payload: []
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

export const get_deliveries = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/deliveries";
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        },
        body: JSON.stringify(data)
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {
        console.log("customDeliveries: ", data);
      
        if(data && data.deliveries && data.deliveries.length>0){

            dispatch({
                type: LIST_DELIVERIES,
                payload: [...data.deliveries]
            });

        }
        else if(data && data.deliveries && data.deliveries.length===1){

            dispatch({
                type: LIST_DELIVERIES,
                payload: [data.deliveries]
            });

        }
        else if(data && data.deliveries && data.deliveries.length===0){

            dispatch({
                type: LIST_DELIVERIES,
                payload: []
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

export const get_employees = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/employees";
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
        console.log("customEmployees: ", data);

        if(data && data.employees && data.employees.length>0){

            dispatch({
                type: LIST_EMPLOYEES,
                payload: [...data.employees]
            });

        }
        else if(data && data.employees && data.employees.length===1){

            dispatch({
                type: LIST_EMPLOYEES,
                payload: [data.employees]
            });

        }
        else if(data && data.employees && data.employees.length===0){

            dispatch({
                type: LIST_EMPLOYEES,
                payload: []
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

export const get_users = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/users";
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
        console.log("customUsers: ", data);

        if(data && data.users && data.users.length>0){

            dispatch({
                type: LIST_USERS,
                payload: [...data.users]
            });

        }
        else if(data && data.users && data.users.length===1){

            dispatch({
                type: LIST_USERS,
                payload: [data.users]
            });

        }
        else if(data && data.users && data.users.length===0){

            dispatch({
                type: LIST_USERS,
                payload: []
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
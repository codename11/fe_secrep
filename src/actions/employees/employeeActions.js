import { LIST_EMPLOYEES, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, ERRORS } from "../types";
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

export const create_employee = (data) => dispatch => {

    let url = "http://secrep.test/api/create_employee";
    
    auth = store.getState().auth.auth;
    let list_employees = store.getState().employees.list_employees;
    
    fetch(url, {
        method: 'POST',
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": "Bearer " + auth.access_token
        },
        body: data
    })
    .then((response) => {

        return response.json();

    })
    .then((data) => {
        console.log("emp1: ", data);
        list_employees.push(data.employee);
        console.log("emp2: ", list_employees);
        dispatch({
            type: LIST_EMPLOYEES,
            payload: [...list_employees]
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const update_employee = (data) => dispatch => {

    let url = "http://secrep.test/api/update_employee";
    
    auth = store.getState().auth.auth;
    let list_employees = store.getState().employees.list_employees;
    
    fetch(url, {
        method: 'POST',
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": "Bearer " + auth.access_token
        },
        body: data,
        redirect: 'follow'
    })
    .then((response) => {

        return response.json();

    })
    .then((data) => {

        let errors = null;
        if("errors" in data){
            let flattenedObj = (obj) => Object.keys(obj).reduce((acc, cur) => typeof obj[cur] === 'object' ? { ...acc, ...flattenedObj(obj[cur]) } : { ...acc, [cur]: obj[cur] } , {});
            errors = {
                origin: "update_employee",
                messages: Object.values(flattenedObj(data))
            };
            dispatch({
                type: ERRORS,
                payload: errors
            });
        }
        else{
            dispatch({
                type: ERRORS,
                payload: null
            });
        }
        
        let index = list_employees.findIndex((item, i) => {
            return data.employee.id === item.id;
        });
        
        let updatedEmployees = list_employees.map((item, i) => {
            
            if(i===index){
                
                return data.employee;
            }
            else{
                return item;
            }
           
        });
        
        dispatch({
            type: LIST_EMPLOYEES,
            payload: [...updatedEmployees]
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
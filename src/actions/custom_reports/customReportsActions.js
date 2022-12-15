import { LIST_VEHICLES, LIST_EMPLOYEES, LIST_DELIVERIES, LIST_USERS, TIME_IN, TIME_OUT, HREF, PAGINATION, LINKOVI,  LIST_ROLES} from "../types";
import store from "../../store";
import { json2csv } from 'json-2-csv';

let auth = null;

export const get_vehicles_custom = (data) => dispatch => {

    auth = store.getState().auth.auth;
    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;

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

        dispatch({
            type: LINKOVI,
            payload: data.linkovi
        });

        if(data && data.hasOwnProperty("vehicles") && data.vehicles.hasOwnProperty("data")){

            let list_vehicles = data && data.vehicles && data.vehicles.data ? data.vehicles.data : null;

            dispatch({
                type: LIST_VEHICLES,
                payload: [...list_vehicles]
            });

            let pagination = data && data.vehicles ? data.vehicles : null;
            delete pagination.data;
            pagination.index = index;
            dispatch({
                type: PAGINATION,
                payload: pagination
            });
            
        }
        else if(data && data.hasOwnProperty("vehicles") && !data.vehicles.hasOwnProperty("data")){
            
            let pagination = data && data.vehicles ? data.vehicles : null;
            pagination.index = index;
            dispatch({
                type: PAGINATION,
                payload: pagination
            });

        }
        
        if(data && data.hasOwnProperty("vehicles") && data.vehicles.hasOwnProperty("registration")){

            let pagination = store.getState() && store.getState().customReports && store.getState().customReports.pagination ? store.getState().customReports.pagination  : null;
            pagination.index = index;
            dispatch({
                type: PAGINATION,
                payload: pagination
            });

            dispatch({
                type: LIST_VEHICLES,
                payload: [data.vehicles]
            });

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
        console.log("state: ", store.getState());
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

export const toCSV = (e, data) => dispatch => {
    let vehicleList = store.getState() && store.getState().vehicles.list_vehicles && store.getState().vehicles.list_vehicles.length>0 ? store.getState().vehicles.list_vehicles : null;
    let data1 = data ? data : vehicleList;

    let json2csvCallback = (err, csv) => {
        if(err){
            throw err;
        }
        
        dispatch({
            type: HREF,
            payload: "data:text/csv;charset=utf-8," + encodeURI(csv)
        });
        
    };

    json2csv(vehicleList, json2csvCallback, {expandArrayObjects:true});

}

export const setTimeIn = (date) => dispatch => {
    
    dispatch({
        type: TIME_IN,
        payload: date
    });

}

export const setTimeOut = (date) => dispatch => {
    
    dispatch({
        type: TIME_OUT,
        payload: date
    });

}

export const setPageNumber = (e, i) => dispatch => {
    
    let page = e && e.currentTarget && e.currentTarget.getAttribute("page") ? e.currentTarget.getAttribute("page") : e;
    
    let pagination = store.getState().customReports.pagination;
    
    let first = pagination.from;
    let last = pagination.last_page;

    let next = (Number(page)+1)<=last ? Number(page)+1 : first;
    let prev = (Number(page)-1)<first ? last : (Number(page)-1);
    
    let url = pagination.path;

    let next_page_url = url+"?page="+next;
    let prev_page_url =  url+"?page="+prev;
    
    let paginacija = {
        current_page: page ? Number(page) : pagination.current_page,
        first_page_url: pagination.first_page_url,
        from: pagination.from,
        last_page: pagination.last_page,
        last_page_url: pagination.last_page_url,
        next_page_url: next_page_url ? next_page_url : pagination.next_page_url,
        path: pagination.path,
        per_page: pagination.per_page,
        prev_page_url: prev_page_url ? prev_page_url : pagination.prev_page_url,
        to: pagination.to,
        total: pagination.total,
        index: i
    }
  
    dispatch({
        type: PAGINATION,
        payload: paginacija
    });

}

export const set_per_page = (data) => dispatch => {

    auth = store.getState().auth.auth;
    
    const create_url = "http://secrep.test/api/create_per_page";//post
    const update_url = "http://secrep.test/api/update_per_page";//patch

    let metoda = data && data.metoda ? data.metoda : null;
    let url = null;
    if(metoda==="post"){
        url = create_url;
    }

    if(metoda==="patch"){
        url = update_url;
    }

    fetch(url, {
        method: metoda, // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        },
        body: JSON.stringify({per_page_id: data.per_page_id, per_page: data.per_page, user_id: data.user_id})
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {

        console.log("set_per_page: ", data);

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const get_roles = () => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/list_roles";
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

        if(data && data.roles && data.roles.length>0){

            dispatch({
                type: LIST_ROLES,
                payload: [...data.roles]
            });

        }
        else if(data && data.roles && data.roles.length===1){

            dispatch({
                type: LIST_ROLES,
                payload: [data.roles]
            });

        }
        else if(data && data.roles && data.roles.length===0){

            dispatch({
                type: LIST_ROLES,
                payload: []
            });

        }
        else{
            console.log("prazno/Niste verifikovani.");
        }

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const update_user_role = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/update_user_role";
    
    fetch(url, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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

        
        let user = data.user[0];

        let list_users = store.getState().users.list_users.map((item, i) => {

            if(item.id===user.id && item.role_id!==user.role_id){
                return user;
            }
            else{
                return item;
            }

        });

        dispatch({
            type: LIST_USERS,
            payload: [...list_users]
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
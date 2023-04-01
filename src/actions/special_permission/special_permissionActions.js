import { LIST_PERMISSIONS, ERRORS, ALERT_SHOW, ALERT_HIDE, PAGINATION } from "../types";
import store from "../../store";

let auth = null;

export const list_permissions = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;

    const url = "http://secrep.test/api/list_special_permissions";
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

        let specialPermission = data && data.specialPermission && data.specialPermission.data ? data.specialPermission.data : null;
        
        dispatch({
            type: LIST_PERMISSIONS,
            payload: specialPermission
        });

        let pagination = data && data.specialPermission ? data.specialPermission : null;
        delete pagination.data;
        pagination.index = index;

        dispatch({
            type: PAGINATION,
            payload: pagination
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const create_permission = (data) => dispatch => {
    
    let url = "http://secrep.test/api/create_special_permissions";

    auth = store.getState().auth.auth;
    
    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;
    
    fetch(url, {
        method: 'POST',
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + auth.access_token
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
    .then((response) => {

        return response.json();

    })
    .then((data) => {

        let specialPermission = data && data.specialPermission && data.specialPermission.data ? data.specialPermission.data : null;
        
        dispatch({
            type: LIST_PERMISSIONS,
            payload: specialPermission
        });

        let pagination = data && data.specialPermission ? data.specialPermission : null;
        delete pagination.data;
        pagination.index = index;

        dispatch({
            type: PAGINATION,
            payload: pagination
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const update_permission = (data) => dispatch => {

    let url = "http://secrep.test/api/update_special_permissions";

    auth = store.getState().auth.auth;
    
    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;

    fetch(url, {
        method: 'PATCH',
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + auth.access_token
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
    .then((response) => {

        return response.json();

    })
    .then((data) => {
        console.log("updperm: ", data.specialPermission);
        let permission = data && data.specialPermission ? data.specialPermission : null;
        let list_permissions = store.getState() && store.getState().special_permissions && store.getState().special_permissions.list_permissions && store.getState().special_permissions.list_permissions.length>0 ? store.getState().special_permissions.list_permissions.map((item, i) => {

            return item.id===permission.id ? permission : item;

        }) : [];

        dispatch({
            type: LIST_PERMISSIONS,
            payload: [...list_permissions]
        });

        /*let errors = {
            type: "",
            origin: "",
            messages: []
        };
        
        if("errors" in data){
            
            let flattenedObj = (obj) => {
                const flattened = {}
              
                Object.keys(obj).forEach((key) => {
                  
                    const value = obj[key];
              
                  if(typeof value === 'object' && value !== null && !Array.isArray(value)){
                    Object.assign(flattened, flattenedObj(value))
                  } 
                  else{
                    flattened[key] = value
                  }

                })
              
                return flattened;

            }
            
            errors = {
                type: "validation",
                origin: "update_permission",
                messages: Object.values(flattenedObj(data))
            };
            
            dispatch({
                type: ERRORS,
                payload: errors
            });
            
            dispatch({
                type: ALERT_SHOW,
                payload: {
                    alertState: true,
                    alert_purpose: "update_permission"
                }
            });
            
        }
        else if("message" in data){

            errors = {
                type: "validation",
                origin: "update_permission",
                messages: [data.exception+". "+data.message]
            };
            
            dispatch({
                type: ERRORS,
                payload: errors
            });
            
            dispatch({
                type: ALERT_SHOW,
                payload: {
                    alertState: true,
                    alert_purpose: "update_permission"
                }
            });

        }
        else{
            
            let permission = data.specialPermission;
            let list_permissions = store.getState() && store.getState().special_permissions && store.getState().special_permissions.list_permissions && store.getState().special_permissions.list_permissions.length>0 ? store.getState().special_permissions.list_permissions.map((item, i) => {

                return item.id===permission.id ? permission : item;

            }) : [];
            
            dispatch({
                type: ERRORS,
                payload: null
            });

            dispatch({
                type: LIST_PERMISSIONS,
                payload: [...list_permissions]
            });

        }*/

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const delete_permission = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/delete_special_permissions";
    fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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

        let permission = data.specialPermission;
        let list_permissions = store.getState() && store.getState().special_permissions && store.getState().special_permissions.list_permissions && store.getState().special_permissions.list_permissions.length>0 ? store.getState().special_permissions.list_permissions.filter((item, i) => {

            return permission.id !== item.id;

        }) : [];
       
        dispatch({
            type: LIST_PERMISSIONS,
            payload: [...list_permissions]
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
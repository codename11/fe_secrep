import { LIST_PERMISSIONS, ERRORS, ALERT_SHOW, ALERT_HIDE } from "../types";
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

export const create_permission = (data) => dispatch => {
    
    let url = "http://secrep.test/api/create_special_permissions";

    auth = store.getState().auth.auth;
    
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
        console.log("blah: ", data);
        let errors = {
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
                origin: "create_delivery",
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
                    alert_purpose: "create_delivery"
                }
            });
            
        }
        else if("message" in data){

            errors = {
                type: "validation",
                origin: "create_delivery",
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
                    alert_purpose: "create_delivery"
                }
            });

        }
        else{
            console.log("my_permission: ", store.getState().special_permissions);
            let list_permissions = store.getState() && store.getState().special_permissions && store.getState().special_permissions.list_permissions && store.getState().special_permissions.list_permissions.length>0 ? store.getState().special_permissions.list_permissions : [];
            let permission = data.specialPermission;
            
            if(list_permissions && list_permissions.length>0){
                list_permissions.push(permission);
            }
            else{
                list_permissions[0] = permission;
            }
            
            dispatch({
                type: ERRORS,
                payload: null
            });

            dispatch({
                type: LIST_PERMISSIONS,
                payload: [...list_permissions]
            });

        }

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
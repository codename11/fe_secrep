import { CREATE_DELIVERY, LIST_DELIVERIES, ERRORS, ALERT_SHOW, ALERT_HIDE, DELIVERYITEMID, SETTIMEIN, SETTIMEOUT, ADDNOTEFIELD, REMOVENOTEFIELD, PAGINATION  } from "../types";
import store from "../../store";

let auth = null;

export const create_delivery = (data) => dispatch => {
    
    let url = "http://secrep.test/api/create_delivery";

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
        console.log("data: ", data);
        let deliveries = data && data.deliveries && data.deliveries.data ? data.deliveries.data : null;
        
        dispatch({
            type: LIST_DELIVERIES,
            payload: deliveries
        });

        let pagination = data && data.deliveries ? data.deliveries : null;
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

export const get_deliveries = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;
    
    const url = "http://secrep.test/api/list_deliveries";
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
        
        let deliveries = data && data.deliveries && data.deliveries.data ? data.deliveries.data : null;
        
        dispatch({
            type: LIST_DELIVERIES,
            payload: deliveries
        });

        let pagination = data && data.deliveries ? data.deliveries : null;
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

export const deleteDelivery = (data) => dispatch => {
    
    auth = store.getState().auth.auth;

    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;
    
    const url = "http://secrep.test/api/delete_delivery";
    fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        },
        body: JSON.stringify({id: data})
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {
        console.log("deldel: ", data);
        /*let deliveries = list_deliveries.filter((item, i) => {
            return data.delivery.id !== item.id;
        });*/

        let list_deliveries = data && data.deliveries && data.deliveries.data ? data.deliveries.data : null;
        
        dispatch({
            type: LIST_DELIVERIES,
            payload: [...list_deliveries]
        });

        let pagination = data && data.deliveries ? data.deliveries : null;
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

export const update_delivery = (data) => dispatch => {

    let url = "http://secrep.test/api/update_delivery";

    auth = store.getState().auth.auth;
    
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
        console.log("update1: ", data);
        let delivery = data && data.delivery ? data.delivery : null;

        let list_deliveries = store.getState() && store.getState().deliveries && store.getState().deliveries.list_deliveries && store.getState().deliveries.list_deliveries.length>0 ? store.getState().deliveries.list_deliveries.map((item, i) => {

            return item.id===delivery.id ? delivery : item;

        }) : [];

        dispatch({
            type: LIST_DELIVERIES,
            payload: [...list_deliveries]
        });

        /*let errors = {
            type: "",
            origin: "",
            messages: []
        };*/
        
        /*if("errors" in data){
            
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
                origin: "update_delivery",
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
                    alert_purpose: "update_delivery"
                }
            });
            
        }
        else if("message" in data){

            errors = {
                type: "validation",
                origin: "update_delivery",
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
                    alert_purpose: "update_delivery"
                }
            });

        }
        else{
            
            let delivery = data.delivery;
            let list_deliveries = store.getState() && store.getState().deliveries && store.getState().deliveries.list_deliveries && store.getState().deliveries.list_deliveries.length>0 ? store.getState().deliveries.list_deliveries.map((item, i) => {

                return item.id===delivery.id ? delivery : item;

            }) : [];
            
            dispatch({
                type: ERRORS,
                payload: null
            });

            dispatch({
                type: LIST_DELIVERIES,
                payload: [...list_deliveries]
            });
            
        }*/

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const handleChange = (itemId) => dispatch => {
    
    let state = store.getState();
    let labelIds = state.deliveries.labelIds;
    
    let arr1 = [...labelIds];
    let index = arr1.indexOf(itemId);
    if(index > -1){
        arr1.splice(index, 1);
    }
    else{
        arr1.push(itemId);
    }

    dispatch({
        type: DELIVERYITEMID,
        payload: [...arr1]
    });

}

export const setLabelIds = (itemId) => dispatch => {
    
    let state = store.getState();
    
    let list_deliveries = state.deliveries.list_deliveries;

    let len1 = list_deliveries.length;
    let index = null;
    for(let i=0;i<len1;i++){

        if(list_deliveries[i].id===itemId){

            index = i;

        }

    }
    
    let complements = list_deliveries[0].complement;
    let arr1 = complements.map( item => item.vehicle_id);
    
    dispatch({
        type: DELIVERYITEMID,
        payload: [...arr1]
    });

}

export const setTimeIn = (date) => dispatch => {

    dispatch({
        type: SETTIMEIN,
        payload: date
    });

}

export const setTimeOut = (date) => dispatch => {

    dispatch({
        type: SETTIMEOUT,
        payload: date
    });

}

export const addNoteField = () => dispatch => {
    
    let state = store.getState();
    let cnt = state.deliveries.cnt;
    
    dispatch({
        type: ADDNOTEFIELD,
        payload: cnt+1
    });

}

export const removeNoteField = () => dispatch => {

    let state = store.getState();
    let cnt = state.deliveries.cnt;

    dispatch({
        type: REMOVENOTEFIELD,
        payload: cnt>0 ? cnt-1 : 0
    });

}


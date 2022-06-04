import { CREATE_DELIVERY, LIST_DELIVERIES, ERRORS, ALERT_SHOW, ALERT_HIDE } from "../types";
import store from "../../store";

let auth = null;

export const create_delivery = (data) => dispatch => {

    let url = "http://secrep.test/api/create_delivery";

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
            console.log("ok");
            let list_deliveries = store.getState() && store.getState().deliveries && store.getState().deliveries.list_deliveries && store.getState().deliveries.list_deliveries.length>0 ? store.getState().deliveries.list_deliveries : [];
            let delivery = data.delivery;
            if(list_deliveries){
                list_deliveries.push(delivery);
            }
            else{
                list_deliveries[0] = delivery;
            }
            
            dispatch({
                type: ERRORS,
                payload: null
            });

            dispatch({
                type: LIST_DELIVERIES,
                payload: [...list_deliveries]
            });

        }

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const get_deliveries = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/list_deliveries";
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

        if(data && data.deliveries && data.deliveries.length>0){
            dispatch({
                type: LIST_DELIVERIES,
                payload: [...data.deliveries]
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

export const deleteDelivery = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    let list_deliveries = store.getState().deliveries.list_deliveries;
    
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
        
        let deliveries = list_deliveries.filter((item, i) => {
            return data.delivery.id !== item.id;
        });
       
        dispatch({
            type: LIST_DELIVERIES,
            payload: [...deliveries]
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
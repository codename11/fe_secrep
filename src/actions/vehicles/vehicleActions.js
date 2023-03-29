import { LIST_VEHICLES, DELETE_VEHICLE, UPDATE_VEHICLE, CREATE_VEHICLE, PAGINATION } from "../types";
import store from "../../store";

let auth = null;

export const get_vehicles = (data) => dispatch => {
    
    auth = store.getState().auth.auth;
    
    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;

    const url = "http://secrep.test/api/list_vehicles";
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

        let vehicles = data && data.vehicles && data.vehicles.data ? data.vehicles.data : null;
        
        dispatch({
            type: LIST_VEHICLES,
            payload: vehicles
        });

        let pagination = data && data.vehicles ? data.vehicles : null;
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

export const deleteVehicle = (data) => dispatch => {

    let url = "http://secrep.test/api/delete_vehicle";

    auth = store.getState().auth.auth;

    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;

    fetch(url, {
        method: 'DELETE',
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        },
        body: JSON.stringify({
            id: data
        })
    })
    .then((response) => {

        return response.json();

    })
    .then((data) => {

        let vehicles = data && data.vehicles && data.vehicles.data ? data.vehicles.data : null;

        dispatch({
            type: DELETE_VEHICLE,
            payload: vehicles
        });

        let pagination = data && data.vehicles ? data.vehicles : null;
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

export const updateVehicle = (data) => dispatch => {
    
    let url = "http://secrep.test/api/update_vehicle";

    auth = store.getState().auth.auth;
    
    fetch(url, {
        method: 'PATCH',
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

    })
    .then((data) => {

        let changed_vehicle = data.vehicle;

        let vehicles_list = store.getState() && store.getState().vehicles && store.getState().vehicles.list_vehicles && store.getState().vehicles.list_vehicles.length>0 ? store.getState().vehicles.list_vehicles.map((item, i) => {
            
            if(changed_vehicle.id==item.id){

                return changed_vehicle;

            }
            else{
                return item;
            }

        }) : null;

        let new_data = {};
        new_data.vehicle = changed_vehicle;
        new_data.vehicles = vehicles_list;
        
        dispatch({
            type: UPDATE_VEHICLE,
            payload: new_data
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const createVehicle = (data) => dispatch => {

    let url = "http://secrep.test/api/create_vehicle";

    auth = store.getState().auth.auth;
    
    let page = data && data.page ? data.page : null;
    let index = page && page>0 ? page-1 : null;
    
    fetch(url, {
        method: 'POST',
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

    })
    .then((data) => {
        
        let list_vehicles = store && store.getState() && store.getState().vehicles && store.getState().vehicles.list_vehicles ? store.getState().vehicles.list_vehicles : null;

        dispatch({
            type: CREATE_VEHICLE,
            payload: list_vehicles
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
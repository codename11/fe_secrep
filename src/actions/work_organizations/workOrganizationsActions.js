import { LIST_WORK_ORGANIZATIONS, CREATE_WORK_ORGANIZATION, UPDATE_WORK_ORGANIZATION, DELETE_WORK_ORGANIZATION } from "../types";
import store from "../../store";

let auth = null;

export const list_work_organizations = (data) => dispatch => {

    auth = store.getState().auth.auth;
    
    const url = "http://secrep.test/api/list_work_organizations";
    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        crossDomain : true,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + auth.access_token
        },
        redirect: 'follow', // manual, *follow, erro
        
    })
    .then((response) => {

        return response.json();

    })// parses JSON response into native JavaScript objects
    .then((data) => {
        
        dispatch({
            type: LIST_WORK_ORGANIZATIONS,
            payload: [...data.workOrganizations]
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const create_work_organization = (data) => dispatch => {

    let url = "http://secrep.test/api/create_work_organizations";

    auth = store.getState().auth.auth;

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

        dispatch({
            type: CREATE_WORK_ORGANIZATION,
            payload: data
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

export const update_work_organization = (data) => dispatch => {
    
    let list_work_organizations = store.getState().list_work_organizations.list_work_organizations;

    let url = "http://secrep.test/api/update_work_organization";
    
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
        
        let index = list_work_organizations.findIndex((item, i) => {
            
            return data.workOrganization.id === item.id;
        });
        
        let updatedWorkOrgs = list_work_organizations.map((item, i) => {
            
            if(i===index){
                return data.workOrganization;
            }
            else{
                return item;
            }
           
        });

        dispatch({
            type: UPDATE_WORK_ORGANIZATION,
            payload: updatedWorkOrgs
        });
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}


export const delete_work_organization = (data) => dispatch => {
    
    let list_work_organizations = store.getState().list_work_organizations.list_work_organizations;

    let url = "http://secrep.test/api/delete_work_organization";
    auth = store.getState().auth.auth;
    
    fetch(url, {
        method: 'DELETE',
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
        
        let workOrgs = list_work_organizations.filter((item, i) => {
            return data.workOrganization.id !== item.id;
        });

        dispatch({
            type: DELETE_WORK_ORGANIZATION,
            payload: workOrgs
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
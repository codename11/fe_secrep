import { LIST_WORK_ORGANIZATIONS, CREATE_WORK_ORGANIZATION, UPDATE_WORK_ORGANIZATION } from "../actions/types";

const initialState = {
    list_work_organizations: null,
    create_work_organization: null
};

let myState = null;
let list_work_organizations = null;

export default function(state = initialState, action){
    console.log("workOrgReducer: ", action);
    switch(action.type){

        case LIST_WORK_ORGANIZATIONS:
            
            list_work_organizations = action.payload;
            
            myState = {
                list_work_organizations: list_work_organizations,
            };
            
            return myState;

        case CREATE_WORK_ORGANIZATION:
            
            list_work_organizations = action.payload.workOrganization;
            
            myState = {
                list_work_organizations: list_work_organizations,
            };
            
            return myState;

        case UPDATE_WORK_ORGANIZATION:
        
            list_work_organizations = action.payload.workOrganizations;
            
            myState = {
                list_work_organizations: list_work_organizations,
            };
            
            return myState;

        default:
            return state;

    }

} 
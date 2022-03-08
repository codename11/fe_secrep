import { LIST_WORK_ORGANIZATIONS } from "../actions/types";

const initialState = {
    work_organizations: null
};

let myState = null;
let list_work_organizations = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case LIST_WORK_ORGANIZATIONS:
            
            list_work_organizations = action.payload;
            
            myState = {
                list_work_organizations: list_work_organizations,
            };
            
            return myState;

        default:
            return state;

    }

} 
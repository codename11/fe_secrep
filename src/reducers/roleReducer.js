import { LIST_ROLES } from "../actions/types";

const initialState = {
    roles: null
};

let myState = null;
let list_roles = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case LIST_ROLES:

            list_roles = action.payload
        
        myState = {
            list_roles: list_roles
        };
        
        return myState;

        default:
            return state;

    }
    
} 
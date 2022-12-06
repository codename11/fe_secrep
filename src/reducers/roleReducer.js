import { LIST_ROLES } from "../actions/types";

const initialState = {
    roles: null
};

let myState = null;
let roles = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case LIST_ROLES:

            roles = action.payload
        
        myState = {
            roles: roles
        };
        
        return myState;

        default:
            return state;

    }
    
} 
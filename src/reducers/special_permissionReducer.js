import { LIST_PERMISSIONS } from "../actions/types";

const initialState = {
    list_employees: null
};
let myState = null;
let list_permissions = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case LIST_PERMISSIONS:
            
            list_permissions = action.payload;

            myState = {
                list_permissions: list_permissions,
            };
            
            return myState;

        default:
            return state;

    }

} 
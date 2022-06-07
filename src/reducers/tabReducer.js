import { REGISTER_TAB, LOGIN_TAB, VEHICLES_TAB, WORK_ORGANIZATION_TAB, EMPLOYEES_TAB, DELIVERIES_TAB, SPECIAL_PERMISSIONS_TAB } from "../actions/types";

const initialState = {
    tabKey: "register_tab"
};

let myState = null;
let key = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case REGISTER_TAB:
            
            key = action.payload;
            
            myState = {
                tabKey: key
            };
            
            return myState;

        case LOGIN_TAB:
            
            key = action.payload
            
            myState = {
                tabKey: key
            };
            
            return myState;
            
        case VEHICLES_TAB:
        
            key = action.payload
            
            myState = {
                tabKey: key
            };
            
            return myState;

        case WORK_ORGANIZATION_TAB:

            key = action.payload
            
            myState = {
                tabKey: key
            };
            
            return myState;
            
        case EMPLOYEES_TAB:

            key = action.payload
            
            myState = {
                tabKey: key
            };
            
            return myState;

        case DELIVERIES_TAB:

            key = action.payload
            
            myState = {
                tabKey: key
            };
            
            return myState;

        case SPECIAL_PERMISSIONS_TAB:

            key = action.payload
            
            myState = {
                tabKey: key
            };
            
            return myState;

        default:
            return state;

    }
    
} 
import { REGISTER_TAB, LOGIN_TAB } from "../actions/types";

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

        default:
            return state;

    }
    
} 
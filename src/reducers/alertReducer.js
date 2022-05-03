import { ALERT_SHOW, ALERT_HIDE } from "../actions/types";

const initialState = {
    alertState: false,
    alert_purpose: null
};

let myState = null;
let alertState = null;
let alert_purpose = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case ALERT_SHOW:

            alertState = action.payload.alertState;
            alert_purpose = action.payload.alert_purpose;

            myState = {
                alertState: alertState,
                alert_purpose: alert_purpose
            };
            
            return myState;

        case ALERT_HIDE:

            alertState = action.payload[0];
            
            myState = {
                alertState: alertState,
                alert_purpose: null
            };
            
            return myState;

        default:
            return state;

    }
    
} 
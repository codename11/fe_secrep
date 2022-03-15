import { MODAL_SHOW, MODAL_HIDE } from "../actions/types";

const initialState = {
    modalState: false,
    vehicleId: null,
    modal_purpose: null
};

let myState = null;
let modalState = null;
let vehicleId = null;
let modal_purpose = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case MODAL_SHOW:
            
            modalState = action.payload[0];
            vehicleId = action.payload[1];
            modal_purpose = action.payload[2];

            myState = {
                modalState: modalState,
                vehicleId: vehicleId,
                modal_purpose: modal_purpose
            };
            
            return myState;

        case MODAL_HIDE:
        
            modalState = action.payload[0];
            
            myState = {
                modalState: modalState,
                vehicleId: null,
                modal_purpose: null
            };
            
            return myState;

        default:
            return state;

    }
    
} 
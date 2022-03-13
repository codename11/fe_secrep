import { MODAL_SHOW, MODAL_HIDE } from "../actions/types";

const initialState = {
    modalState: false,
    vehicleId: null
};

let myState = null;
let modalState = null;
let vehicleId = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case MODAL_SHOW:
            
            modalState = action.payload[0];
            vehicleId = action.payload[1];

            myState = {
                modalState: modalState,
                vehicleId: vehicleId
            };
            
            return myState;

        case MODAL_HIDE:
        
            modalState = action.payload[0];
            
            myState = {
                modalState: modalState,
                vehicleId: null
            };
            
            return myState;

        default:
            return state;

    }
    
} 
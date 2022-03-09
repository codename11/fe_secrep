import { MODAL_SHOW, MODAL_HIDE } from "../actions/types";

const initialState = {
    modalState: false
};

let myState = null;
let modalState = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case MODAL_SHOW:
            
            modalState = action.payload;
            
            myState = {
                modalState: modalState
            };
            
            return myState;

        case MODAL_HIDE:
        
            modalState = action.payload;
            
            myState = {
                modalState: modalState
            };
            
            return myState;

        default:
            return state;

    }
    
} 
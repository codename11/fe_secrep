import { MODAL_SHOW, MODAL_HIDE } from "../actions/types";

const initialState = {
    modalState: false,
    itemId: null,
    modal_purpose: null,
    labelIds: null
};

let myState = null;
let modalState = null;
let itemId = null;
let modal_purpose = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case MODAL_SHOW:
            
            modalState = action.payload[0];
            itemId = action.payload[1];
            modal_purpose = action.payload[2];

            myState = {
                modalState: modalState,
                itemId: itemId,
                modal_purpose: modal_purpose
            };
            
            return myState;

        case MODAL_HIDE:
        
            modalState = action.payload[0];
            
            myState = {
                modalState: modalState,
                itemId: null,
                modal_purpose: null,
                labelIds: null
            };
            
            return myState;

        default:
            return state;

    }
    
} 
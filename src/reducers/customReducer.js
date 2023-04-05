import { SELECT_OPTION, CHECKED } from "../actions/types";

const initialState = {
    select_option: null,
    checkboxes: [],
};

let myState = null;
let select_option = null;
let checkboxes = [];

export default function(state = initialState, action){
    
    switch(action.type){

        case SELECT_OPTION:
            
            select_option = action.payload;

            myState = {
                select_option: select_option
            };
            
            return myState;

        case CHECKED:
            
            checkboxes = action.payload;

            myState = {
                checkboxes: checkboxes
            };
            
            return myState;

        default:
            return state;

    }
    
} 
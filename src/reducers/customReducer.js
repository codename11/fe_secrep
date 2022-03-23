import { SELECT_OPTION } from "../actions/types";

const initialState = {
    select_option: null,
};

let myState = null;
let select_option = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case SELECT_OPTION:
            
            select_option = action.payload;

            myState = {
                select_option: select_option
            };
            
            return myState;

        default:
            return state;

    }
    
} 
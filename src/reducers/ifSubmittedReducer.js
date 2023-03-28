import { IF_SUBMITTED } from "../actions/types";

const initialState = {
    ifSubmitted: false
};

let myState = null;
let ifSubmitted = false;

export default function(state = initialState, action){
    
    switch(action.type){

        case IF_SUBMITTED:
            
            ifSubmitted = action.payload;
            
            myState = {
                ifSubmitted: ifSubmitted,
            };
            
            return myState;

        default:
            return state;

    }

} 
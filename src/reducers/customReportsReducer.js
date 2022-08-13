import { TIME_IN, TIME_OUT, HREF } from "../actions/types";

const initialState = {
    time_in: null,
    time_out: null,
    href: null
};

let myState = null;
let time_in = null;
let time_out = null;
let href = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case TIME_IN:
            
            time_in = action.payload;

            myState = {
                time_in: time_in
            };
            
            return myState;

        case TIME_OUT:
        
            time_out = action.payload;

            myState = {
                time_out: time_out
            };
            
            return myState;

        case HREF:
            
            href = action.payload;

            myState = {
                href: href
            };
            
            return myState;

        default:
            return state;

    }
    
} 
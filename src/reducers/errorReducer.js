import { ERRORS } from "../actions/types";

const initialState = {
    errors: null
};
let myState = null;
let errors = null;

export default function(state = initialState, action){

    switch(action.type){

        case ERRORS:
            
            errors = action.payload;
            
            myState = {
                errors,
            };
            
            return myState;

        default:
            return state;

    }

} 
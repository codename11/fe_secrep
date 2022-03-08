import { LIST_VEHICLE_TYPES } from "../actions/types";

const initialState = {
    vehicles_types: null
};

let myState = null;
let list_vehicle_types = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case LIST_VEHICLE_TYPES:
            
            list_vehicle_types = action.payload;
            
            myState = {
                list_vehicle_types: list_vehicle_types,
            };
            
            return myState;

        default:
            return state;

    }

} 
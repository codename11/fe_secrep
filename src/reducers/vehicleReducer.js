import { LIST_VEHICLES } from "../actions/types";

const initialState = {
    list_vehicles: null
};

let myState = null;
let list_vehicles = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case LIST_VEHICLES:
            
            list_vehicles = action.payload;
            
            myState = {
                list_vehicles: list_vehicles,
            };
            
            return myState;

        default:
            return state;

    }

} 
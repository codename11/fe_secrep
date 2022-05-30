import { CREATE_DELIVERY, LIST_DELIVERIES } from "../actions/types";

const initialState = {
    list_deliveries: null
};
let myState = null;
let list_deliveries = null;

export default function(state = initialState, action){

    switch(action.type){

        case LIST_DELIVERIES:
            
            list_deliveries = action.payload;
            
            myState = {
                list_deliveries: list_deliveries,
            };
            
            return myState;

        default:
            return state;

    }

} 
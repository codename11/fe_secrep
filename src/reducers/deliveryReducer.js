import { CREATE_DELIVERY, LIST_DELIVERIES, DELIVERYITEMID, SETTIMEIN, SETTIMEOUT, ADDNOTEFIELD, REMOVENOTEFIELD } from "../actions/types";

const initialState = {
    list_deliveries: null,
    cnt: 0,
    time_in: new Date(),
    time_out: new Date(),
    labelIds: []
};
let myState = null;
let list_deliveries = null;
let cnt = null;
let labelIds = [];
let time_in = null;
let time_out = null;

export default function(state = initialState, action){

    switch(action.type){

        case LIST_DELIVERIES:
            
            list_deliveries = action.payload;
            
            myState = {
                list_deliveries: list_deliveries,
                labelIds: state.labelIds,
                time_in: state.time_in,
                time_out: state.time_out,
                cnt: state.cnt
            };
            
            return myState;

        case DELIVERYITEMID:
            
            labelIds = action.payload;
            console.log("DELIVERYITEMID: ", action);
            myState = {
                labelIds: labelIds,
                time_in: state.time_in,
                time_out: state.time_out,
                cnt: state.cnt
            };
            
            return myState;

        case SETTIMEIN:
        
            time_in = action.payload;
            console.log("SETTIMEIN: ", action);
            myState = {
                time_in: time_in,
                time_out: state.time_out,
                labelIds: state.labelIds,
                cnt: state.cnt
            };
            
            return myState;

        case SETTIMEOUT:
    
            time_out = action.payload;
            console.log("SETTIMEOUT: ", action);
            myState = {
                time_out: time_out,
                time_in: state.time_in,
                labelIds: state.labelIds,
                cnt: state.cnt
            };
            
            return myState;

        case ADDNOTEFIELD:

            cnt = action.payload;
            console.log("ADDNOTEFIELD: ", action);
            myState = {
                cnt: cnt,
                time_out: state.time_out,
                time_in: state.time_in,
                labelIds: state.labelIds,
            };
            
            return myState;
        
        case REMOVENOTEFIELD:

            cnt = action.payload;
            console.log("REMOVENOTEFIELD: ", action);
            myState = {
                cnt: cnt,
                time_out: state.time_out,
                time_in: state.time_in,
                labelIds: state.labelIds,
            };
            
            return myState;

        default:
            return state;

    }

} 
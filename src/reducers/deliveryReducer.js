import { CREATE_DELIVERY, LIST_DELIVERIES, DELIVERYITEMID, SETTIMEIN, SETTIMEOUT, ADDNOTEFIELD, REMOVENOTEFIELD, PAGINATION } from "../actions/types";

const initialState = {
    list_deliveries: null,
    cnt: 0,
    time_in: new Date(),
    time_out: new Date(),
    labelIds: [],
    pagination: {
        current_page: null,
        first_page_url: null,
        from: null,
        last_page: null,
        last_page_url: null,
        next_page_url: null,
        path: null,
        per_page: null,
        prev_page_url: null,
        to: null,
        total: null,
        index: 0
    },
    linkovi: null
};
let myState = null;
let list_deliveries = null;
let cnt = null;
let labelIds = [];
let time_in = null;
let time_out = null;
let pagination = {
    current_page: null,
    first_page_url: null,
    from: null,
    last_page: null,
    last_page_url: null,
    next_page_url: null,
    path: null,
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
    index: 0
};

let linkovi = null;

export default function(state = initialState, action){

    switch(action.type){

        case LIST_DELIVERIES:
            
            list_deliveries = action.payload;
            
            myState = {
                list_deliveries: list_deliveries,
                labelIds: state.labelIds,
                time_in: state.time_in,
                time_out: state.time_out,
                cnt: state.cnt,
                linkovi: linkovi
            };
            
            return myState;

        case DELIVERYITEMID:
            
            labelIds = action.payload;
            
            myState = {
                list_deliveries: state.list_deliveries,
                labelIds: labelIds,
                time_in: state.time_in,
                time_out: state.time_out,
                cnt: state.cnt
            };
            
            return myState;

        case SETTIMEIN:
        
            time_in = action.payload;
            
            myState = {
                list_deliveries: state.list_deliveries,
                time_in: time_in,
                time_out: state.time_out,
                labelIds: state.labelIds,
                cnt: state.cnt
            };
            
            return myState;

        case SETTIMEOUT:
    
            time_out = action.payload;
            
            myState = {
                list_deliveries: state.list_deliveries,
                time_out: time_out,
                time_in: state.time_in,
                labelIds: state.labelIds,
                cnt: state.cnt
            };
            
            return myState;

        case ADDNOTEFIELD:

            cnt = action.payload;
            
            myState = {
                list_deliveries: state.list_deliveries,
                cnt: cnt,
                time_out: state.time_out,
                time_in: state.time_in,
                labelIds: state.labelIds,
            };
            
            return myState;
        
        case REMOVENOTEFIELD:

            cnt = action.payload;
            
            myState = {
                list_deliveries: state.list_deliveries,
                cnt: cnt,
                time_out: state.time_out,
                time_in: state.time_in,
                labelIds: state.labelIds,
            };
            
            return myState;
        
        case PAGINATION:
            
            pagination.current_page = action && action.payload && action.payload.current_page ? action.payload.current_page : initialState.pagination.current_page;
            pagination.first_page_url = action && action.payload && action.payload.first_page_url ? action.payload.first_page_url : initialState.pagination.first_page_url;
            pagination.from = action && action.payload && action.payload.from ? action.payload.from : initialState.pagination.from;
            pagination.last_page = action && action.payload && action.payload.last_page ? action.payload.last_page : initialState.pagination.last_page;
            pagination.last_page_url = action && action.payload && action.payload.last_page_url ? action.payload.last_page_url : initialState.pagination.last_page_url;
            pagination.next_page_url = action && action.payload && action.payload.next_page_url ? action.payload.next_page_url : initialState.pagination.next_page_url;
            pagination.path = action && action.payload && action.payload.path ? action.payload.path : initialState.pagination.path;
            pagination.per_page = action && action.payload && action.payload.per_page ? action.payload.per_page : initialState.pagination.per_page;
            pagination.prev_page_url = action && action.payload && action.payload.prev_page_url ? action.payload.prev_page_url : initialState.pagination.prev_page_url;
            pagination.to = action && action.payload && action.payload.to ? action.payload.to : initialState.pagination.to;
            pagination.total = action && action.payload && action.payload.total ? action.payload.total : initialState.pagination.total;
            pagination.index = action && action.payload && action.payload.index ? action.payload.index : initialState.pagination.index;
            
            myState = {
                list_deliveries: state.list_deliveries,
                pagination: pagination,
                labelIds: state.labelIds,
            };
        
            return myState;

        default:
            return state;

    }

} 
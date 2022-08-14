import { TIME_IN, TIME_OUT, HREF, PAGINATION } from "../actions/types";

const initialState = {
    time_in: new Date(),
    time_out: new Date(),
    href: null,
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
        total: null
    }
};

let myState = null;
let time_in = null;
let time_out = null;
let href = null;
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
    total: null
};

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
                href: href,
                time_in: initialState.time_in,
                time_out: initialState.time_out
            };
            
            return myState;

        case PAGINATION:
            
            pagination.current_page = action.payload.current_page;
            pagination.first_page_url = action.payload.first_page_url;
            pagination.from = action.payload.from;
            pagination.last_page = action.payload.last_page;
            pagination.last_page_url = action.payload.last_page_url;
            pagination.next_page_url = action.payload.next_page_url;
            pagination.path = action.payload.path;
            pagination.per_page = action.payload.per_page;
            pagination.prev_page_url = action.payload.prev_page_url;
            pagination.to = action.payload.to;
            pagination.total = action.payload.total;

            myState = {
                pagination: pagination,
                time_in: initialState.time_in,
                time_out: initialState.time_out
            };
            
            return myState;

        default:
            return state;

    }
    
} 
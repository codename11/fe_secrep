import { TIME_IN, TIME_OUT, HREF, PAGINATION} from "../actions/types";

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
        total: null,
        index: 0
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
    total: null,
    index: 0
};

export default function(state = initialState, action){

    switch(action.type){

        case TIME_IN:
            
            time_in = action.payload;

            myState = {
                href: state.href,
                time_in: time_in,
                time_out: time_out,
                pagination: state.pagination
            };
            
            return myState;

        case TIME_OUT:
        
            time_out = action.payload;

            myState = {
                href: state.href,
                time_out: time_out,
                time_in: state.time_in,
                pagination: state.pagination
            };
            
            return myState;

        case HREF:
            
            href = action.payload;
            
            myState = {
                href: href,
                time_in: state.time_in,
                time_out: state.time_out,
                pagination: state.pagination
            };
            
            return myState;

        case PAGINATION:
            
            pagination.current_page = action && action.payload && action.payload.current_page ? action.payload.current_page : initialState.current_page;
            pagination.first_page_url = action && action.payload && action.payload.first_page_url ? action.payload.first_page_url : initialState.first_page_url;
            pagination.from = action && action.payload && action.payload.from ? action.payload.from : initialState.from;
            pagination.last_page = action && action.payload && action.payload.last_page ? action.payload.last_page : initialState.last_page;
            pagination.last_page_url = action && action.payload && action.payload.last_page_url ? action.payload.last_page_url : initialState.last_page_url;
            pagination.next_page_url = action && action.payload && action.payload.next_page_url ? action.payload.next_page_url : initialState.next_page_url;
            pagination.path = action && action.payload && action.payload.path ? action.payload.path : initialState.path;
            pagination.per_page = action && action.payload && action.payload.per_page ? action.payload.per_page : initialState.per_page;
            pagination.prev_page_url = action && action.payload && action.payload.prev_page_url ? action.payload.prev_page_url : initialState.prev_page_url;
            pagination.to = action && action.payload && action.payload.to ? action.payload.to : initialState.to;
            pagination.total = action && action.payload && action.payload.total ? action.payload.total : initialState.total;
            pagination.index = action.payload.index;
            
            myState = {
                href: state.href,
                pagination: pagination,
                time_in: state.time_in,
                time_out: state.time_out
            };
        
        return myState;

        default:
            return state;

    }
    
} 
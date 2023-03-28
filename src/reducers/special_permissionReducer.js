import { LIST_PERMISSIONS, PAGINATION } from "../actions/types";

const initialState = {
    list_employees: null,
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
let list_permissions = null;
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

        case LIST_PERMISSIONS:
            
            list_permissions = action.payload;

            myState = {
                list_permissions: list_permissions,
                pagination: state.pagination
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
                list_permissions: state.list_permissions,
                pagination: pagination,
            };
        
            return myState;

        default:
            return state;

    }

} 
import { LIST_VEHICLES, DELETE_VEHICLE, UPDATE_VEHICLE, PAGINATION } from "../actions/types";

const initialState = {
    list_vehicles: null,
    deleted_vehicle_id: null,
    updated_vehicle_id: null,
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
let list_vehicles = null;
let deleted_vehicle_id = null;
let updated_vehicle_id = null;
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

        case LIST_VEHICLES:
            
            list_vehicles = action.payload;
            
            myState = {
                list_vehicles: list_vehicles,
                pagination: state.pagination
            };
            
            return myState;
        
        case DELETE_VEHICLE:
            
            deleted_vehicle_id = action.payload.vehicle.id;
            list_vehicles = action.payload.vehicles;
            
            myState = {
                list_vehicles: list_vehicles,
                deleted_vehicle_id: deleted_vehicle_id,
                pagination: state.pagination
            }

            return myState;

        case UPDATE_VEHICLE:
            
            updated_vehicle_id = action.payload.vehicle.id;
            list_vehicles = action.payload.vehicles;
            
            myState = {
                list_vehicles: list_vehicles,
                updated_vehicle_id: updated_vehicle_id,
                pagination: state.pagination
            }

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
                list_vehicles: state.list_vehicles,
                pagination: pagination,
            };
        
            return myState;

        default:
            return state;

    }

} 
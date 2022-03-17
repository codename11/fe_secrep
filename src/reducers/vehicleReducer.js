import { LIST_VEHICLES, DELETE_VEHICLE, UPDATE_VEHICLE } from "../actions/types";

const initialState = {
    list_vehicles: null,
    deleted_vehicle_id: null,
    updated_vehicle_id: null
};

let myState = null;
let list_vehicles = null;
let deleted_vehicle_id = null;
let updated_vehicle_id = null;

export default function(state = initialState, action){

    switch(action.type){

        case LIST_VEHICLES:
            
            list_vehicles = action.payload;
            
            myState = {
                list_vehicles: list_vehicles,
            };
            
            return myState;
        
        case DELETE_VEHICLE:
            
            deleted_vehicle_id = action.payload.vehicle.id;
            list_vehicles = action.payload.vehicles;
            
            myState = {
                list_vehicles: list_vehicles,
                deleted_vehicle_id: deleted_vehicle_id
            }

            return myState;

        case UPDATE_VEHICLE:
            
            updated_vehicle_id = action.payload.vehicle.id;
            list_vehicles = action.payload.vehicles;
            
            myState = {
                list_vehicles: list_vehicles,
                updated_vehicle_id: updated_vehicle_id
            }

            return myState;

        default:
            return state;

    }

} 
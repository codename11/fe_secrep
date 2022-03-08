import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tabReducer from "./tabReducer";
import vehicleReducer from "./vehicleReducer";
import vehicleTypesReducer from "./vehicleTypesReducer";
import workOrganizationsReducer from "./workOrganizationsReducer";

export default combineReducers({
    auth: authReducer,
    key: tabReducer,
    vehicles: vehicleReducer,
    list_vehicle_types: vehicleTypesReducer,
    list_work_organizations: workOrganizationsReducer
});
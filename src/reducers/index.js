import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tabReducer from "./tabReducer";
import vehicleReducer from "./vehicleReducer";
import vehicleTypesReducer from "./vehicleTypesReducer";
import workOrganizationsReducer from "./workOrganizationsReducer";
import modalReducer from "./modalReducer";
import customReducer from "./customReducer";
import employeeReducer from "./employeeReducer";
import errorReducer from "./errorReducer";
import alertReducer from "./alertReducer";
import deliveryReducer from "./deliveryReducer";
import special_permissionReducer from "./special_permissionReducer";
import userReducer from "./userReducer";

export default combineReducers({
    auth: authReducer,
    key: tabReducer,
    vehicles: vehicleReducer,
    list_vehicle_types: vehicleTypesReducer,
    list_work_organizations: workOrganizationsReducer,
    modalState: modalReducer,
    form: customReducer,
    employees: employeeReducer,
    errors: errorReducer,
    alert: alertReducer,
    deliveries: deliveryReducer,
    special_permissions: special_permissionReducer,
    users: userReducer
});
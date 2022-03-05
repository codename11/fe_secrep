import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tabReducer from "./tabReducer";
import vehicleReducer from "./vehicleReducer";

export default combineReducers({
    auth: authReducer,
    key: tabReducer,
    vehicles: vehicleReducer
});
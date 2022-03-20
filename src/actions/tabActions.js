import { REGISTER_TAB, LOGIN_TAB, LIST_VEHICLES_TAB, CREATE_VEHICLE_TAB, WORK_ORGANIZATION_TAB } from "./types";

export const setTab = (tabKey) => dispatch => {
    
    let tmp1 = tabKey.toUpperCase();
    let tmp2 = tabKey.toLowerCase();
    
    if(tmp1===REGISTER_TAB || tmp1===LOGIN_TAB || tmp1===LIST_VEHICLES_TAB || tmp1===CREATE_VEHICLE_TAB || tmp1===WORK_ORGANIZATION_TAB){
        
        dispatch({
            type: tmp1,
            payload: tmp2
        });

    }

}
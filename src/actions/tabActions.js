import { REGISTER_TAB, LOGIN_TAB, VEHICLES_TAB, WORK_ORGANIZATION_TAB, EMPLOYEES_TAB, DELIVERIES_TAB } from "./types";

export const setTab = (tabKey) => dispatch => {
    
    let tmp1 = tabKey.toUpperCase();
    let tmp2 = tabKey.toLowerCase();
    
    if(tmp1===REGISTER_TAB || tmp1===LOGIN_TAB || tmp1===VEHICLES_TAB || tmp1===WORK_ORGANIZATION_TAB || tmp1===EMPLOYEES_TAB || tmp1===DELIVERIES_TAB){
        
        dispatch({
            type: tmp1,
            payload: tmp2
        });

    }

}
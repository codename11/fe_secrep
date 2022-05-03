import { ALERT_SHOW, ALERT_HIDE } from "./types";

export const alertShow = (data) => dispatch => {
    
    dispatch({
        type: ALERT_SHOW,
        payload: data
    });
    
}

export const alertHide = (data) => dispatch => {
    
    dispatch({
        type: ALERT_HIDE,
        payload: data
    });
    
}
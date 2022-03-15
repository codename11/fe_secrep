import { MODAL_SHOW, MODAL_HIDE } from "./types";

export const modalShow = (data) => dispatch => {
    
    dispatch({
        type: MODAL_SHOW,
        payload: data
    });
    
}

export const modalHide = (data) => dispatch => {
    
    dispatch({
        type: MODAL_HIDE,
        payload: data
    });
    
}
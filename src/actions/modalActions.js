import { MODAL_SHOW, MODAL_HIDE } from "./types";

export const modalShow = (data) => dispatch => {
    //console.log("modalShow: ", data);
    dispatch({
        type: MODAL_SHOW,
        payload: data
    });
    
}

export const modalHide = (data) => dispatch => {
    //console.log("modalHide: ", data);
    dispatch({
        type: MODAL_HIDE,
        payload: data
    });
    
}
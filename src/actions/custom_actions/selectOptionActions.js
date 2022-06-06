import { SELECT_OPTION } from "../types";

export const select_option = (data) => dispatch => {
    
    dispatch({
        type: SELECT_OPTION,
        payload: data
    });

}
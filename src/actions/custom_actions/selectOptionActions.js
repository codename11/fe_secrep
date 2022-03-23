import { SELECT_OPTION } from "../types";

export const select_option = (data) => dispatch => {
    //console.log("select_option: ", data);
    dispatch({
        type: SELECT_OPTION,
        payload: data
    });

}
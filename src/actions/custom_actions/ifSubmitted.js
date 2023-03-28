import { IF_SUBMITTED } from "../types";

export const if_submitted = (text) => dispatch => {

    dispatch({
        type: IF_SUBMITTED,
        payload: true
    });
    alert(text);

}
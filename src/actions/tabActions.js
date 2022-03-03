import { REGISTER, LOGIN} from "./types";

export const setTab = (tabKey) => dispatch => {
    
    dispatch({
        type: tabKey.toUpperCase(),
        payload: tabKey.toLowerCase()
    });

}
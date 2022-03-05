import { REGISTER_TAB, LOGIN_TAB, LIST_VEHICLES_TAB} from "./types";

export const setTab = (tabKey) => dispatch => {
    
    dispatch({
        type: tabKey.toUpperCase(),
        payload: tabKey.toLowerCase()
    });

}
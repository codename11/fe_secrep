import { LIST_USERS } from "../actions/types";

const initialState = {
    list_users: null
};

let myState = null;
let list_users = null;

export default function(state = initialState, action){

    switch(action.type){

        case LIST_USERS:
            
            list_users = action.payload;
            
            myState = {
                list_users: list_users,
            };
            
            return myState;

        default:
            return state;

    }

} 
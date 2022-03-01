import { REGISTER, LOGIN } from "../actions/types";

const initialState = {
    auth: {
        user: null,
        access_token: null
    }
};

let myState = null;
let user = null;
let access_token = null;

export default function(state = initialState, action){

    switch(action.type){

        case REGISTER:
            
            user= action.payload.user;
            access_token = action.payload.access_token;

            myState = {
                auth: {
                    user: user,
                    access_token: access_token
                },
            };

            return myState;

        case LOGIN:
            
            user = action.payload.user;
            access_token = action.payload.access_token;

            myState = {
                auth: {
                    user: user,
                    access_token: access_token
                }
            };

            return myState;

        default:
            return state;

    }

} 
import { REGISTER, LOGIN } from "../actions/types";

const initialState = {
    key: "register"
};

let myState = null;
let key = null;

export default function(state = initialState, action){
    
    switch(action.type){

        case REGISTER:
            
            key = action.payload.toLowerCase();
            
            myState = {
                tabKey: key,
            };
            console.log(myState);
            return myState;

        case LOGIN:
            
            key = action.payload.toLowerCase();
            
            myState = {
                tabKey: key,
            };
            console.log(myState);
            return myState;

        default:
            
            return state;

    }
    
} 
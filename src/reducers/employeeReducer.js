import { LIST_EMPLOYEES } from "../actions/types";

const initialState = {
    list_employees: null
};
let myState = null;
let list_employees = null;

export default function(state = initialState, action){

    switch(action.type){

        case LIST_EMPLOYEES:
            
            list_employees = action.payload;
            
            myState = {
                list_employees: list_employees,
            };
            
            return myState;

        default:
            return state;

    }

} 
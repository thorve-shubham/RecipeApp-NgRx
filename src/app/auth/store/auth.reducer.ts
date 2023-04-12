import { User } from "../user.model";
import { AuthAction, LOGIN, LOGOUT, Login } from "./auth.actions";

const initialState : AuthState = {
    user : null
}

export interface AuthState {
    user : User;
}

export function authReducer(state=initialState, action : AuthAction) {
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                user : (action as Login).payload
            }
        case LOGOUT:
            return {
                ...state,
                user : null
            }
        default : 
            return state;
    }
}
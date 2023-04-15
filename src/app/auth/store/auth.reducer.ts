import { User } from "../user.model";
import { AuthAction, CLEAR_ERROR, LOGIN, LOGIN_FAIL, LOGIN_START, LOGOUT, Login, LoginFail, SIGNUP_START } from "./auth.actions";

const initialState : AuthState = {
    user : null,
    authError : null,
    loading : false
}

export interface AuthState {
    user : User;
    authError : string;
    loading : boolean;
}

export function authReducer(state : AuthState =initialState, action : AuthAction) {
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                user : (action as Login).payload,
                authError : null,
                loading : false
            }
        case LOGOUT:
            return {
                ...state,
                user : null,
                authError : null,
                loading : false
            }
        case SIGNUP_START:
            return {
                ...state,
                authError : null,
                loading : true
            }
        case LOGIN_START:
            return {
                ...state,
                authError : null,
                loading : true
            }
        case LOGIN_FAIL:
            return {
                ...state,
                user : null,
                authError : (action as LoginFail).payload,
                loading : false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                authError : null
            }
        default : 
            return state;
    }
}
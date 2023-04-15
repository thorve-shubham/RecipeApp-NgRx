import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SIGNUP_START = "SIGNUP_START";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const AUTO_LOGIN = "AUTO_LOGIN";

export class Login implements Action {
    readonly type: string = LOGIN;
    constructor(public payload: User) {}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
}

export class LoginStart implements Action {
    readonly type : string = LOGIN_START;
    constructor(public payoad: {email:string,password:string}) {}
}

export class LoginFail implements Action {
    readonly type: string = LOGIN_FAIL;
    constructor(public payload : string) {}
}

export class SingUpStart implements Action {
    readonly type: string = SIGNUP_START;
    constructor(public payload : {email:string,password:string}) {}
}

export class ClearError implements Action {
    readonly type: string = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type: string = AUTO_LOGIN;
}

export type AuthAction = Login | Logout | LoginStart | LoginFail | SingUpStart | ClearError | AutoLogin;
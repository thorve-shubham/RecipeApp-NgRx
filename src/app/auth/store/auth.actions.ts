import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_START = "LOGIN_START";

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

export type AuthAction = Login | Logout | LoginStart;
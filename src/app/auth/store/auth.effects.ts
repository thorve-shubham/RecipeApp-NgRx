import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LOGIN_START, Login, LoginStart } from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "../auth.service";
import { environment } from "src/environments/environment";
import { User } from "../user.model";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffect {
    authLogin$ = createEffect(()=>
        this.actions$.pipe(
            ofType(LOGIN_START),
            switchMap((authData : LoginStart)=>{
                return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.apiKey,
                {
                    email: authData.payoad.email,
                    password: authData.payoad.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData=>{
                        const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn) *1000);
                        const user = new User(resData.email,resData.localId,resData.idToken,expirationDate);
                        // this.user.next(user);
                        return new Login(user);
                    }),
                    catchError(err=>{
                        return of();
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private http:HttpClient) {}
}
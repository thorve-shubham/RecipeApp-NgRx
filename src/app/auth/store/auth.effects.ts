import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AUTO_LOGIN, LOGIN, LOGIN_START, LOGOUT, Login, LoginFail, LoginStart, SIGNUP_START, SingUpStart } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "../user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export interface AuthResponse {
    idToken : string,
    email: string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered? : boolean
  }

@Injectable()
export class AuthEffect {

    authSignUp = createEffect(()=>{
        return this.actions$.pipe(
            ofType(SIGNUP_START),
            switchMap((signUpStartAction: SingUpStart)=>{
                return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.apiKey,
                {
                    email : signUpStartAction.payload.email,
                    password : signUpStartAction.payload.password,
                    returnSecureToken : true
                }).pipe(
                    tap((resData)=>{
                        this.authService.setLogOutTimer(+resData.expiresIn)
                    }),
                    map(resData=>{
                        return this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                    }),
                    catchError((errorRes)=>{
                        return this.handleErrorResponse(errorRes);
                    })
                );
            })
        )
    })

    authLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(LOGIN_START),
            switchMap((authData : LoginStart)=>{
                return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.apiKey,
                {
                    email: authData.payoad.email,
                    password: authData.payoad.password,
                    returnSecureToken: true
                }).pipe(
                    tap((resData)=>{
                        this.authService.setLogOutTimer(+resData.expiresIn)
                    }),
                    map(resData=>{
                        return this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                    }),
                    catchError(errorResponse=>{
                        return this.handleErrorResponse(errorResponse);
                    })
                );
            })
        )
        });

    routeHandler$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(LOGIN),
            tap(() => {
                this.router.navigate(['/']);
            })
        );
    },
    {dispatch : false})

    routeHandler1$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(LOGOUT),
            tap(() => {
                localStorage.removeItem("user");
                this.authService.clearLogOutTimer();
                this.router.navigate(['/auth']);
            })
        );
    },
    {dispatch : false})

    autoLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(AUTO_LOGIN),
            map(()=>{
                const user : {
                    email : string;
                    userId : string;
                    _token : string;
                    _tokenExpirationDate : string;
                } = JSON.parse(localStorage.getItem("user"));
                if(!user)
                    return { type : "Dummy"};
                const loadedUser = new User(user.email,user.userId,user._token,new Date(user._tokenExpirationDate));
                if(loadedUser.token){
                    const expiresIn = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
                    this.authService.setLogOutTimer(expiresIn);
                    return new Login(loadedUser);
                }
            })
        )
    })

    handleAuthentication(email : string,localId :string,token : string ,expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + expiresIn *1000);
        const user = new User(email,localId,token,expirationDate);
        localStorage.setItem("user",JSON.stringify(user));
        return new Login(user);
    }

    private handleErrorResponse (errorResponse: HttpErrorResponse) {
        let errorMessage = "Something went wrong!!!";
            if(!errorResponse.error || !errorResponse.error.error) {
                return of(new LoginFail(errorMessage));
            } else {
                switch (errorResponse.error.error.message) {
                    case "EMAIL_EXISTS" : {
                        errorMessage = "The email address is already in use by another account.";
                        break;
                    }
                    case "OPERATION_NOT_ALLOWED" : {
                        errorMessage = "Password sign-in is disabled for this project.";
                        break;
                    }
                    case "TOO_MANY_ATTEMPTS_TRY_LATER" : {
                        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
                        break;
                    }
                    case "EMAIL_NOT_FOUND" : {
                        errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted."
                        break;
                    }
                    case "USER_DISABLED" : {
                        errorMessage = "The user account has been disabled by an administrator."
                        break;
                    }
                    case "INVALID_PASSWORD" : {
                        errorMessage = "The password is invalid or the user does not have a password."
                        break;
                    }
                    default : {
                        errorMessage = "Something went wrong!!!";
                    }
                }
                return of(new LoginFail(errorMessage));
            }
      }

    constructor(private actions$: Actions, private http:HttpClient, private router: Router, private authService : AuthService) {}
}
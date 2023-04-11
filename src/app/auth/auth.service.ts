import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError, timeInterval } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  idToken : string,
  email: string,
  refreshToken : string,
  expiresIn : string,
  localId : string,
  registered? : boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logOutTimer : any = null;

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router : Router) { }

  logIn(email:string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.apiKey,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleErrorResponse)
    ,tap(resData=>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }));
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.apiKey,
    {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleErrorResponse)
      ,tap(resData=>{
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
      }));
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem("user");
    if(this.logOutTimer)
      clearTimeout(this.logOutTimer);
    this.logOutTimer = null;
  }

  autoLogIn() {
    const user : {
      email : string;
      userId : string;
      _token : string;
      _tokenExpirationDate : string;
    } = JSON.parse(localStorage.getItem("user"));
    if(!user)
      return;
    const loadedUser = new User(user.email,user.userId,user._token,new Date(user._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expiresIn = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expiresIn);
    }
      
  }

  autoLogOut(expiresIn : number) {
    console.log(expiresIn);
    this.logOutTimer = setTimeout(()=>{
      this.logOut();
    },expiresIn)
  }

  getUserObservable() {
    return this.user.asObservable();
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn *1000);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
    localStorage.setItem("user",JSON.stringify(user));
    this.autoLogOut(expiresIn *1000);
  }

  private handleErrorResponse (errorResponse: HttpErrorResponse) {
    let errorMessage = "Something went wrong!!!";
    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
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
      return throwError(errorMessage);
    }
  }
}

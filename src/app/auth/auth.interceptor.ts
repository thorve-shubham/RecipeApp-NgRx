import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "../state/app.reducer";
import { User } from "./user.model";

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

    constructor(private authService : AuthService, private store:Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            exhaustMap(authState=>{
                if(!authState.user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params : new HttpParams().set("auth",authState.user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
    
}
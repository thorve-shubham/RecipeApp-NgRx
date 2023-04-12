import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { AppState } from "../state/app.reducer";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn : "root"
})
export class AuthGuardService implements CanActivate {

    constructor(private authService : AuthService, private router: Router, private store:Store<AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(AuthState=>{
                console.log(AuthState.user);
                let isAuth = !!AuthState.user;
                if(isAuth) return true;
                return this.router.createUrlTree(['/auth']);
            })
        );
        // return this.authService.user.pipe(
        //     take(1),
        //     map(user=>{
        //         let isAuth = !!user;
        //         if(isAuth) return true;
        //         return this.router.createUrlTree(['/auth']);
        //     })
        // );
    }
    
}
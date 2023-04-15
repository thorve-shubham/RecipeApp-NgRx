import { Injectable } from '@angular/core'
import { AppState } from '../state/app.reducer';
import { Store } from '@ngrx/store';
import { Logout } from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logOutTimer : any = null;

  constructor(private store:Store<AppState>) { }

  clearLogOutTimer() {
    if(this.logOutTimer){
      clearTimeout(this.logOutTimer);
      this.logOutTimer = null;
    }
  }

  setLogOutTimer(expiresIn : number) {
    this.logOutTimer = setTimeout(()=>{
      console.log("dispatched logout")
      this.store.dispatch(new Logout());
    },expiresIn)
  }

}

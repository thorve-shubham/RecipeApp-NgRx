import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';
import { AppState } from '../state/app.reducer';
import { Store } from '@ngrx/store';
import { Logout } from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription : Subscription;

  isAuthenticated : boolean = false;

  constructor(private dataStoreService : DataStorageService,
    private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('auth').subscribe(authState=>{
      this.isAuthenticated = !!authState.user;
    })
  }

  saveRecipes() {
    this.dataStoreService.saveRecipes();
  }

  fetchRecipes() {
    this.dataStoreService.fetchRecipes().subscribe();
  }

  logOut() { 
    this.store.dispatch(new Logout())
  }

}

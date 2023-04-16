import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../state/app.reducer';
import { Store } from '@ngrx/store';
import { Logout } from '../auth/store/auth.actions';
import { FetchRecipes, SaveRecipes } from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription : Subscription;

  isAuthenticated : boolean = false;

  constructor(
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
    // this.dataStoreService.saveRecipes();
    this.store.dispatch(new SaveRecipes());
  }

  fetchRecipes() {
    this.store.dispatch(new FetchRecipes());
  }

  logOut() { 
    this.store.dispatch(new Logout())
  }

}

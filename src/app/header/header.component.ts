import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription : Subscription;

  isAuthenticated : boolean = false;

  constructor(private dataStoreService : DataStorageService,
    private authSrvice: AuthService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.authSrvice.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    })
  }

  saveRecipes() {
    this.dataStoreService.saveRecipes();
  }

  fetchRecipes() {
    this.dataStoreService.fetchRecipes().subscribe();
  }

  logOut() { 
    this.authSrvice.logOut();
  }

}

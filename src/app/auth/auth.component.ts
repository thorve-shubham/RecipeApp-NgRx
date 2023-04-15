import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AppState } from '../state/app.reducer';
import { Store } from '@ngrx/store';
import { ClearError, LoginStart, SingUpStart } from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLogIn:boolean = true;
  isLoading: boolean = false;
  error : string = null;
  @ViewChild(PlaceHolderDirective)
  alertHost : PlaceHolderDirective;
  alertCloseSubscription : Subscription;
  storeSubscription : Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<AppState>) { }

  ngOnDestroy(): void {
    if(this.alertCloseSubscription)
      this.alertCloseSubscription.unsubscribe();
    if(this.storeSubscription)
      this.storeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe(
      authState=>{
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if(this.error)
          this.showAlertPopUp(this.error);
      }
    )
  }

  switchProperty() {
    this.isLogIn = !this.isLogIn;
  }

  signIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if(this.isLogIn){
      this.store.dispatch(new LoginStart({email : email, password : password}));
    } else {
      this.store.dispatch(new SingUpStart({email : email, password : password}));
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new ClearError())
  }

  showAlertPopUp( message : string) {
    const alertComp = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const host = this.alertHost.viewContainerRef;
    host.clear();
    const alertComponent = host.createComponent(alertComp);
    alertComponent.instance.message = message;
    this.alertCloseSubscription = alertComponent.instance.close.subscribe(()=>{
      this.alertCloseSubscription.unsubscribe();
      host.clear();
    });
    
  }

}

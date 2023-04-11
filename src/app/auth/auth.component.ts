import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponse, AuthService } from './auth.service';

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

  constructor(private authService : AuthService,
    private router : Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnDestroy(): void {
    if(this.alertCloseSubscription)
      this.alertCloseSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  switchProperty() {
    this.isLogIn = !this.isLogIn;
  }

  signIn(form: NgForm) {
    let AuthObs: Observable<AuthResponse>;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if(this.isLogIn){
      AuthObs = this.authService.logIn(email,password);
    } else {
      AuthObs = this.authService.signUp(email,password)
    }
    AuthObs.subscribe(
      (authResponse)=>{
        console.log(authResponse);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage)=> {
        this.error = errorMessage;
        this.showAlertPopUp(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
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

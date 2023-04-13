import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './state/app.reducer';
import { AuthEffect } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(appReducer),
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    EffectsModule.forRoot([AuthEffect])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

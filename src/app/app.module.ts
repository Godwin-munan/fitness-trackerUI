import { NgModule, isDevMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { TrainingModule } from './training/training.module';
import { CoreModule } from '@core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authFeature, uiFeature } from '@fitness/store/index';
import { 
  loadUserFromLoginEffect, 
  loadUserFromRegistrationEffect } from './store/effects/auth.effects';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    TrainingModule,
    JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: [environment.domain],
      disallowedRoutes: [],
    },
  }),
    StoreModule.forRoot(),
    StoreModule.forFeature(uiFeature),
    StoreModule.forFeature(authFeature),

    EffectsModule.forRoot(),
    EffectsModule.forFeature([
      {loadUserFromLoginEffect},
      {loadUserFromRegistrationEffect}
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

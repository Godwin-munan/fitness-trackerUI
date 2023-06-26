import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AuthInterceptorProvider } from './interceptor/auth-interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '@env/environment';


const MODULES: any[] = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  MaterialModule,
  FormsModule,
  HttpClientModule,
  HammerModule,

];

const SERVICES: any[] = [
  AuthInterceptorProvider,
  {provide: MAT_DATE_LOCALE, useValue: 'en-NG'},
];

const COMPONENTS: any[] = [SnackbarComponent,]

const DIRECTIVES: any[] = [];

const PIPES: any[] = [];

const SCHEMAS: any[] = [ CUSTOM_ELEMENTS_SCHEMA ]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES,  ],
  imports: [...MODULES],
  providers: [...SERVICES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  schemas: [...SCHEMAS],
})
export class SharedModule { }

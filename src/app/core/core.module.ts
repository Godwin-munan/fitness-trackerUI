import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { LoginComponent } from './authentication/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class CoreModule { }

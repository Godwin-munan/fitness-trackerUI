import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@core/authentication/login/login.component';
import { SignUpComponent } from '@core/authentication/sign-up/sign-up.component';
import { HomeComponent } from '@core/components/home/home.component';
import { AuthGuard } from '@core/authentication/authGuard/auth.guard';
import {  inject } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,  },
  { 
    path: 'signup', 
    component: SignUpComponent, 
    // canDeactivate: [() => inject(AuthGuard).canDeactivate()]
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    // canDeactivate: [() => inject(AuthGuard).canDeactivate()] 
  },
  {
    path: 'training', 
    loadChildren: () => import('@training/training.module').then(m => m.TrainingModule), 
    canMatch: [() => inject(AuthGuard).canMatch()]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }



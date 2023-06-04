import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@core/authentication/login/login.component';
import { SignUpComponent } from '@core/authentication/sign-up/sign-up.component';
import { HomeComponent } from '@core/components/home/home.component';
import { TrainingComponent } from './training/components/training/training.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'signup', component: SignUpComponent },
  {path: 'login', component: LoginComponent },
  {path: 'training', component: TrainingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

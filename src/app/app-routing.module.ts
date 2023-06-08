import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@core/authentication/login/login.component';
import { SignUpComponent } from '@core/authentication/sign-up/sign-up.component';
import { HomeComponent } from '@core/components/home/home.component';
import { TrainingComponent } from './training/components/training/training.component';
import { AuthGuard } from '@core/authentication/authGuard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'signup', component: SignUpComponent },
  {path: 'login', component: LoginComponent },
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }

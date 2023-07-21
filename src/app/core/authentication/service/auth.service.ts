import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AuthData } from '../model/auth-data.model';

import { Router } from '@angular/router';
import { ApiService } from './api/api.service';
import { AuthEndPoints, Constants } from '@core/constant/api-constants';
import { SignUpData } from '../model/signup.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackbarService } from './snackbar/snackbar.service';
import { Store } from '@ngrx/store';
import { 
  setAuthenticated, 
  setUnauthenticed,
  startLoading,
  stopLoading 
} from '@fitness/global/store';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN = 'access_token';

  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private _jwtHelper: JwtHelperService,
    private _snackbar: SnackbarService,
    private _store: Store
  ) { 
    this.isLogIn(this.getToken);
  }

  registerUser(signUpData: SignUpData){
    return this._apiService.add<User>(AuthEndPoints.SIGNUP, signUpData);
  }

  login(authData: AuthData){

    this._store.dispatch(startLoading());
    
    return this._apiService.add<User>(AuthEndPoints.LOGIN, authData);
    
  }

  logout(){
    this.logoutSuccessfully();
  }

  public stopError(errorMsg: string){
    this._store.dispatch(stopLoading());

    this._snackbar
      .openSnackBar(errorMsg,Constants.ERROR);
  }



  //Get User from Local storage
  getUser() : User {

    let raw = localStorage.getItem(Constants.PRINCIPAL) as string;
    let user;
    if(raw) 
      user =  JSON.parse(raw) as User;
    return { ...user };
  }

  isLogIn(token: string){
    let isExpired = true;
  
    if(!token) {
      return;
    };

    isExpired = this._jwtHelper.isTokenExpired(token).valueOf() as boolean;

    if(isExpired) {
      this._store.dispatch(setUnauthenticed());
      localStorage.removeItem(this.ACCESS_TOKEN);
    }else {
      this._store.dispatch(setAuthenticated());
    }
  }

  authSuccessfully(token: string, user: User){

    localStorage.setItem(this.ACCESS_TOKEN, token);
    localStorage.setItem(Constants.PRINCIPAL, JSON.stringify(user));
    this._router.navigate(['/training']);
    this._snackbar.openSnackBar('Login successfully')
  }

  //get token from local storage
  get getToken(): string{
    return localStorage.getItem(this.ACCESS_TOKEN) as string;
  }



  private logoutSuccessfully(){

    this._store.dispatch(setUnauthenticed());

    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(Constants.PRINCIPAL);
    this._router.navigate(['/login']);
  }




}

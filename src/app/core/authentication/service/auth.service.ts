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
} from '@fitness/store/index';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN = 'access_token';

  private user!: User | null;

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
    this._store.dispatch(startLoading());

    return this._apiService.add<User>(AuthEndPoints.SIGNUP, signUpData)
    // .subscribe({
    //   next: response => {

    //     this._store.dispatch(stopLoading());

    //     this.user = response.data as User;
    //     let token = response.response as string;
    //     this.authSuccessfully(token, this.user);
    //   },
    //   error: error => {

    //     this._store.dispatch(stopLoading());

    //     this._snackbar
    //       .openSnackBar(
    //         error?.originalError.error.message,
    //          Constants.ERROR
    //       );
    //   }
    // })
  }

  login(authData: AuthData){

    this._store.dispatch(startLoading());
    
    return this._apiService.add<User>(AuthEndPoints.LOGIN, authData)
    // .subscribe({
    //   next: response => {

    //     this._store.dispatch(stopLoading());

    //     this.user = response.data as User;
    //     let token = response.response as string;
    //     this.authSuccessfully(token, this.user);
    //   },
    //   error: error => {

    //     this._store.dispatch(stopLoading());
        
    //     this._snackbar
    //       .openSnackBar(
    //         error?.originalError.error.message,
    //          Constants.ERROR
    //       );
    //   }
    // })
    
  }

  public stopError(errorMsg: string){
    this._store.dispatch(stopLoading());

    this._snackbar
      .openSnackBar(errorMsg,Constants.ERROR);
  }

  logout(){
    this.user = null;
    this.logoutSuccessfully();
  }

  getUser() : User {
    let raw = localStorage.getItem(Constants.PRINCIPAL) as string;
    let user;
    if(raw) 
      user =  JSON.parse(raw) as User;
    return { ...user };
  }

  public authSuccessfully(token: string, user: User){

    this._store.dispatch(stopLoading());
    this._store.dispatch(setAuthenticated());

    localStorage.setItem(this.ACCESS_TOKEN, token);
    localStorage.setItem(Constants.PRINCIPAL, JSON.stringify(user));
    this._router.navigate(['/training']);
    this._snackbar.openSnackBar('Login successfully')
  }

  private logoutSuccessfully(){

    this._store.dispatch(setUnauthenticed());

    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(Constants.PRINCIPAL);
    this._router.navigate(['/login']);
  }


  //get token from local storage
  get getToken(): string{
    return localStorage.getItem(this.ACCESS_TOKEN) as string;
  }

  isLogIn(token: string){
    let isExpired = true;
  
    if(!token) {
      this._store.dispatch(setAuthenticated());
    };

    isExpired = this._jwtHelper.isTokenExpired(token).valueOf() as boolean;

    if(isExpired) {
      this._store.dispatch(setUnauthenticed());
      localStorage.removeItem(this.ACCESS_TOKEN);
    }else {
      this._store.dispatch(setAuthenticated());
    }
  }
}

import { Injectable } from '@angular/core';
import {Router,} from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@reducers/auth/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private _router: Router,
    private _store: Store,
    ){

  }

  canMatch() {
    return this.implementActivateGuard;
  }
  
  canActivate() {
      return this.implementActivateGuard;
  }

  canDeactivate(){
    return this.implementDeactivateGuard;
  }


  get implementActivateGuard(){

    return this._store.select(selectIsAuthenticated).pipe(
      tap(isLogin => {
        if(!isLogin) this._router.navigate(['/login']);
      }));
  }

  get implementDeactivateGuard(){
    return this._store.select(selectIsAuthenticated).pipe(
      tap(isLogin => {
        if(!isLogin) this._router.navigate(['/training']);
      }));
  }
  
}

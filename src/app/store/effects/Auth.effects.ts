import { inject } from "@angular/core";
import { AuthService } from "@core/authentication/service/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { User } from "@core/authentication/model/user.model";
import { AppError } from "@core/error/app-error";
import { failureMsg, startLoading, stopLoading } from "../actions/ui.actions";
import { 
  LoginSuccessfull, 
  setAuthenticated, 
  startLogin, 
  startRegistration } from "../actions/auth.actions";
import { 
  catchError, 
  exhaustMap, 
  map,
  of,
  switchMap, 
  tap} from "rxjs";
import { Store } from "@ngrx/store";


export const loadUserFromLoginEffect = createEffect(
  (
    action$ = inject(Actions),
    authService  = inject(AuthService),
    _store = inject(Store)
  ) => {

    return action$.pipe(
      ofType(startLogin),
      tap(() => _store.dispatch(startLoading())),
      switchMap(action => authService.login(action.authData)
      .pipe(
        map(response => {
          let user = response.data as User;
          let token = response.response as string

          authService.authSuccessfully(token, user);
          return user;
        }),
        switchMap(user => [
          // stopLoading(),
          setAuthenticated(),
          LoginSuccessfull({principal: user})
        ]),
        catchError((error: AppError) => {
          let errorMsg = error.er as string;
          authService.stopError(errorMsg);

          return [failureMsg({errorMsg: errorMsg })];
        })        
      )),
    )
  },
  { functional: true}
);


export const loadUserFromRegistrationEffect = createEffect(
  (
    action$ = inject(Actions),
    authService  = inject(AuthService),
    _store = inject(Store)
  ) => {

    return action$.pipe(
      ofType(startRegistration),
      tap(() => _store.dispatch(startLoading())),
      switchMap(action => authService.registerUser(action.signUp).pipe(
        map(response => {
          let user = response.data as User;
          let token = response.response as string

          authService.authSuccessfully(token, user);

          return user;
        }),
        switchMap(user => [
          stopLoading(),
          setAuthenticated(),
          LoginSuccessfull({principal: user})
        ]),
        catchError((error: AppError) => {
          let errorMsg = error.er as string;
          authService.stopError(errorMsg);

          return of(failureMsg({errorMsg: errorMsg }))
        })        
      )),
    )
  },
  { functional: true}
);






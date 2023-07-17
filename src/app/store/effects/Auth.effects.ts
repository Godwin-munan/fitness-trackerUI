import { Injectable, inject } from "@angular/core";
import { AuthService } from "@core/authentication/service/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginSuccessfull, failureAuth, startLogin, startRegistration } from "../actions/auth.actions";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { User } from "@core/authentication/model/user.model";
import { AppError } from "@core/error/app-error";



export const loadUserFromLogin = createEffect(
  (
    action$ = inject(Actions),
    authService  = inject(AuthService)
  ) => {

    return action$.pipe(
      ofType(startLogin),
      switchMap(action => authService.login(action.authData).pipe(
        map(response => {
          let user = response.data as User;
          let token = response.response as string

          authService.authSuccessfully(token, user);

          return LoginSuccessfull({principal: user})
        }),
        catchError((error: AppError) => {
          let errorMsg = error.er as string;
          authService.stopError(errorMsg);

          return of(failureAuth({errorMsg: errorMsg }))
        })        
      )),
    )
  },
  { functional: true}
);


export const loadUserFromRegistration = createEffect(
  (
    action$ = inject(Actions),
    authService  = inject(AuthService)
  ) => {

    return action$.pipe(
      ofType(startRegistration),
      switchMap(action => authService.registerUser(action.signUp).pipe(
        map(response => {
          let user = response.data as User;
          let token = response.response as string

          authService.authSuccessfully(token, user);

          return LoginSuccessfull({principal: user})
        }),
        catchError((error: AppError) => {
          let errorMsg = error.er as string;
          authService.stopError(errorMsg);

          return of(failureAuth({errorMsg: errorMsg }))
        })        
      )),
    )
  },
  { functional: true}
);






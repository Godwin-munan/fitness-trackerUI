import { AuthData } from "@core/authentication/model/auth-data.model";
import { SignUpData } from "@core/authentication/model/signup.model";
import { User } from "@core/authentication/model/user.model";
import { createAction, props } from "@ngrx/store";

//Auth state
export const setAuthenticated = createAction('[Auth] Set Authenticated');
export const setUnauthenticed = createAction('[Auth] Set Unauthenticad');
export const failureAuth = createAction(
  '[Auth] Failed to Authenticate',
  props<{errorMsg: string}>()
  );

//Login
export const startLogin = createAction(
  '[Auth] Start Login',
  props<{authData: AuthData}>()
  );

export const LoginSuccessfull = createAction(
  '[Auth] Successful Login',
  props<{principal: User}>()
  );


//Register
export const startRegistration = createAction(
  '[Auth] Start Registration',
  props<{signUp: SignUpData}>()
  );

export const RegistrationSuccessfull = createAction(
  '[Auth] Successful Registration',
  props<{principal: User}>()
  );



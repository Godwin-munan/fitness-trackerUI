import { Action, createAction } from "@ngrx/store";


export const setAuthenticated = createAction('[Auth] Set Authenticated');
export const setUnauthenticed = createAction('[Auth] Set Unauthenticad');
 
import { Action, createAction } from "@ngrx/store";


export const setAuthenticated = createAction('[Auth] Set Authenticated');
export const setUnauthenticed = createAction('[Auth] Set Unauthenticad');
 
// Action with props (payload)
// export const customerDetailLoaded = createAction(
//     "[Customers Page] Customer Detail Opened",
//     props<{ customerId: string }>())


// export type AuthActions = SetAuthenticated | SetUnauthenticated;
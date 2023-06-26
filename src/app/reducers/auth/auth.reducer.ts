import { createFeature, createReducer, on } from "@ngrx/store";
import { setAuthenticated, setUnauthenticed } from "./auth.actions";

export interface AuthState {
  isAuthenticated: boolean;
}

// const initialState: State = {
//   isAuthenticated: false
// }


const initialState: AuthState = {
    isAuthenticated: false
};


//  const _uiReducer = createReducer(
//       initialState,
//       on(setAuthenticated, (state) => ({ ...state, isAuthenticated: true })),
//       on(setUnauthenticed, (state) => ({ ...state, isAuthenticated: false }))
//     );


// export function uiReducer(state: any, action: Action) {
//   return _uiReducer(state, action);
// }

// const _counterReducer = createReducer(initialState,
//   on(increment, state => state + 1),
//   on(decrement, state => state - 1),
//   on(reset, state => 0),
// );

export const authFeature = createFeature({
  name: "auth",
  reducer: createReducer(
      initialState,
      on(setAuthenticated, (state) => ({ ...state, isAuthenticated: true })),
      on(setUnauthenticed, (state) => ({ ...state, isAuthenticated: false }))
    ),
});

authFeature.selectAuthState
export const selectIsAuthenticated = authFeature.selectIsAuthenticated;



// const customersFeature = createFeature({
//   name: "auth",

// })


// export function uiReducer(state: State = initialState, action: AuthActions): State{
//   switch(action.type){
//     case SET_AUTHENTICATED:
//       return {
//         isAuthenticated: true
//       };
//     case SET_UNAUTHENTICATED:
//       return {
//         isAuthenticated: false
//       };
//     default: {
//       return state;
//     }
//   }
// }

// export const getIsAuth = (state: State) => state.isAuthenticated;
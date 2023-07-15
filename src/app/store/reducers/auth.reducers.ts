import { createFeature, createReducer, on } from "@ngrx/store";
import { setAuthenticated, setUnauthenticed } from "../actions/auth.actions";

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false
};


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

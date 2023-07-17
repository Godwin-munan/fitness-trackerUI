import { createFeature, createReducer, on } from "@ngrx/store";
import { LoginSuccessfull, RegistrationSuccessfull, failureAuth, setAuthenticated, setUnauthenticed, startLogin } from "../actions/auth.actions";
import { User } from "@core/authentication/model/user.model";

export interface AuthState {
  isAuthenticated: boolean;
  principal: User | null;
  errorMsg: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    principal: null,
    errorMsg: null
};

const authReducer = createReducer(
      initialState,
      on(setAuthenticated, (state) => ({ ...state, isAuthenticated: true })),
      on(setUnauthenticed, (state) => ({ ...state, isAuthenticated: false })),
      on(LoginSuccessfull, (state, action) => (
        {
          ...state,
          principal: Object.assign({}, action.principal)
        }
        )),
      on(RegistrationSuccessfull, (state, action) => (
        {
          ...state,
          principal: Object.assign({}, action.principal)
        }
        )),
      on(failureAuth, (state, action) => ({ ...state, errorMsg: action.errorMsg})),
    )


export const authFeature = createFeature({
  name: "auth",
  reducer: authReducer,
});

const authState = authFeature.selectAuthState;
export const selectIsAuthenticated = authFeature.selectIsAuthenticated;
export const selectPrincipal = authFeature.selectPrincipal;
export const selectError =  authFeature.selectErrorMsg;

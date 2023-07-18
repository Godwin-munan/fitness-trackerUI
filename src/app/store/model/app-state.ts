import { AuthState } from "../reducers/auth.reducers";
import { UiState } from "../reducers/ui.reducers";

export interface AppState {
  ui: UiState;
  auth: AuthState;
}
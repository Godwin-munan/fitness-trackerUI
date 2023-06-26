import * as fromUi from '../ui/ui.reducer';
import * as fromAuth from '../auth/auth.reducer';

export interface AppState {
  ui: fromUi.UiState;
  auth: fromAuth.AuthState;
}

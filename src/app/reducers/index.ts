import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromUi from './ui/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

// export interface AppState {
//   ui: fromUi.AppState;
//   auth: fromAuth.AppState;
// }

// export const reducers: ActionReducerMap<AppState, Action> = {
//   ui: fromUi.uiReducer,
//   auth: fromAuth.uiReducer
// };


// export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

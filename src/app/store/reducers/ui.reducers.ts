import { createFeature, createReducer, on } from "@ngrx/store";
import { failureMsg, startLoading, stopLoading } from "../actions/ui.actions";

export interface UiState {
  isLoading: boolean;
  errorMsg: string | null;
}

const initialState: UiState = {
    isLoading: false,
    errorMsg: null,
};

export const uiFeature = createFeature({
  name: "ui",
  reducer: createReducer(
      initialState,
      on(startLoading, (state) => ({ ...state, isLoading: true })),
      on(stopLoading, (state) => ({ ...state, isLoading: false })),
      on(failureMsg, (state, action) => ({ ...state, errorMsg: action.errorMsg})),
    ),
});

uiFeature.selectUiState;
export const selectIsLoading = uiFeature.selectIsLoading;
export const selectError =  uiFeature.selectErrorMsg;
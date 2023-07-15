import { createFeature, createReducer, on } from "@ngrx/store";
import { startLoading, stopLoading } from "../actions/ui.actions";

export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
    isLoading: false
};

export const uiFeature = createFeature({
  name: "ui",
  reducer: createReducer(
      initialState,
      on(startLoading, (state) => ({ ...state, isLoading: true })),
      on(stopLoading, (state) => ({ ...state, isLoading: false }))
    ),
});

uiFeature.selectUiState;
export const selectIsLoading = uiFeature.selectIsLoading;
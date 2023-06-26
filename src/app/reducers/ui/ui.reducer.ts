import { createFeature, createReducer, on } from "@ngrx/store";
import { startLoading, stopLoading } from "./ui.actions";

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

// export interface State {
//   isLoading: boolean;
// }

// const initialState: State = {
//   isLoading: false
// }

// export function uiReducer(state: State = initialState, action: UIActions): State{
//   switch(action.type){
//     case START_LOADING:
//       return {
//         isLoading: true
//       };
//     case STOP_LOADING:
//       return {
//         isLoading: false
//       };
//     default: {
//       return state;
//     }
//   }
// }

// export const getIsLoading = (state: State) => state.isLoading;
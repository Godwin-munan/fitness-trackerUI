import { createFeature, createReducer, on } from "@ngrx/store";
import { setAvailableExercises, setFinishedExercises, startExercise, stopExercise } from "./training.actions";
import { Exercise } from "@training/model/exercise.model";
import { AppState } from "@reducers/model/app-state";

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
}

export interface State extends AppState {
  training: TrainingState
}


const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};


export const trainingFeature = createFeature({
  name: "training",
  reducer: createReducer(
    initialState,
    on(setAvailableExercises, (state, action) => ({
       ...state, 
       availableExercises: action.availableExercise })
       ),
    on(setFinishedExercises, (state, action) => ({
       ...state, 
       finishedExercises: action.finishedExercise  })
       ),
    on(startExercise, (state, action) => ({
       ...state,
      activeTraining: activeTraining(state.availableExercises, action.exerciseId) })
      ),
    on(stopExercise, (state) => ({
       ...state, 
       activeTraining: null  })
       )
  )
});

function activeTraining(exercises: Exercise[], exerciseId: number): Exercise {
    return Object.assign({}, exercises.find(ex => ex.id === exerciseId ));
  }

trainingFeature.selectTrainingState;

export const selectAvailableExercises = trainingFeature.selectAvailableExercises;
export const selectFinishedExercises = trainingFeature.selectFinishedExercises;
export const selectActiveTraining = trainingFeature.selectActiveTraining;
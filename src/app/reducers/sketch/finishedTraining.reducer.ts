import { Action, ActionReducerMap, createFeature, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { setAvailableExercises, setFinishedExercises, startExercise, stopExercise } from "../training/training.actions";
import { Exercise } from "@training/model/exercise.model";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";


interface TrainingState {
  availableExercises: EntityState<Exercise>;
  finishedExercises: EntityState<Exercise>;
  activeTraining: Exercise | null;
}

//creating ngrx entity adapters
const availableExercisesAdapter: EntityAdapter<Exercise> = createEntityAdapter<Exercise>();
const finishedExercisesAdapter: EntityAdapter<Exercise> = createEntityAdapter<Exercise>();


const initialAvailableExercisesState = availableExercisesAdapter.getInitialState();
const initialFinishedExercisesState = finishedExercisesAdapter.getInitialState();

//Initiating state
const initialState: TrainingState = {
  availableExercises: initialAvailableExercisesState,
  finishedExercises: initialFinishedExercisesState,
  activeTraining: null,
}

//creating training reducer
const _trainingReducer = createReducer(
  initialState,

  on(setAvailableExercises, (state, action) => {
    return {
      ...state,
      availableExercises: availableExercisesAdapter.addMany(action.availableExercise, state.availableExercises),
    };
  }),
  on(setFinishedExercises, (state, action) => {
    return {
      ...state,
      finishedExercises: finishedExercisesAdapter.addMany(action.finishedExercise, state.finishedExercises),
    };
  }),
  on(startExercise, (state, action) => {
    const activeTraining = state.availableExercises.entities[action.exerciseId] as Exercise;
    return Object.assign({}, { ...state, activeTraining: activeTraining} )
  }),
  on(stopExercise, (state) => Object.assign({}, {...state, activeTraining: null }))
);

//creating selectors
const selectTrainingState = createFeatureSelector<TrainingState>('training');

const selectAvailableExercisesState = createSelector(
  selectTrainingState,
  (state) => state.availableExercises
);
const selectFinishedExercisesState = createSelector(
  selectTrainingState,
  (state) => state.finishedExercises
);

const selectActiveTraining = createSelector(
  selectTrainingState,
  (state) => state.activeTraining
);

const {
  selectAll: selectAllAvailableExercises,
  selectTotal: selectAvailableExercisesTotal,
} = availableExercisesAdapter.getSelectors(selectAvailableExercisesState);

const {
  selectAll: selectAllFinishedExercises,
  selectTotal: selectFinishedExercisesTotal,
} = finishedExercisesAdapter.getSelectors(selectFinishedExercisesState);


export const trainingSelectors = {
  selectAllAvailableExercises,
  selectAvailableExercisesTotal,
  selectAllFinishedExercises,
  selectFinishedExercisesTotal,
  selectActiveTraining,
};

export function trainingReducer(state: TrainingState, action: Action) {
  return _trainingReducer(state, action);
}





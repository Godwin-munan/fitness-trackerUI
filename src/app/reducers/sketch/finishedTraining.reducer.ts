import { Action, ActionReducerMap, createFeature, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { setAvailableExercises, setFinishedExercises, startExercise, stopExercise } from "../training/training.actions";
import { Exercise } from "@training/model/exercise.model";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";


const availableExercisesAdapter = createEntityAdapter<Exercise>();
const finishedExercisesAdapter = createEntityAdapter<Exercise>();

interface TrainingState {
  availableExercises: EntityState<Exercise>;
  finishedExercises: EntityState<Exercise>;
  activeTraining: Exercise | null;
}

const initialAvailableExercisesState = availableExercisesAdapter.getInitialState();
const initialFinishedExercisesState = finishedExercisesAdapter.getInitialState();

const initialState: TrainingState = {
  availableExercises: initialAvailableExercisesState,
  finishedExercises: initialFinishedExercisesState,
  activeTraining: null,
}


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


// export const trainingFeature = createFeature({
//   name: 'training',
//   reducer: _trainingReducer
// })

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
  selectEntities: selectAvailableExercisesEntities,
  selectIds: selectAvailableExercisesIds,
  selectTotal: selectAvailableExercisesTotal,
} = availableExercisesAdapter.getSelectors(selectAvailableExercisesState);

const {
  selectAll: selectAllFinishedExercises,
  selectEntities: selectFinishedExercisesEntities,
  selectIds: selectFinishedExercisesIds,
  selectTotal: selectFinishedExercisesTotal,
} = finishedExercisesAdapter.getSelectors(selectFinishedExercisesState);


export const trainingSelectors = {
  selectAllAvailableExercises,
  selectAvailableExercisesTotal,
  selectAllFinishedExercises,
  selectFinishedExercisesEntities,
  selectFinishedExercisesIds,
  selectFinishedExercisesTotal,
  selectActiveTraining,
};

export function trainingReducer(state: TrainingState, action: Action) {
  return _trainingReducer(state, action);
}





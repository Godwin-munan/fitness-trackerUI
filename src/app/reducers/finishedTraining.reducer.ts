import { ActionReducerMap, createFeature, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { setFinishedExercises } from "../reducers/training/training.actions";
import { Exercise } from "@training/model/exercise.model";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";


export interface FinishedTrainingState extends EntityState<Exercise> {

}

export const FinishedAdapter = createEntityAdapter<Exercise>({
  selectId: (exercise: Exercise) => exercise.id,
});


export const finishedInitialState: FinishedTrainingState = FinishedAdapter.getInitialState();


export const finishedReducer = createReducer(
  finishedInitialState,
  on(setFinishedExercises, (state, action) =>
  FinishedAdapter.setAll(action.finishedExercise, state)
  ),
);



// export const reducers: ActionReducerMap<State> = {
//   finishedExercise: finishedReducer,
// };

const selectFinishedExerciseState = createFeatureSelector<FinishedTrainingState>('finishedExercise');


const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = FinishedAdapter.getSelectors();


// export const selectFinishedTrainingIds = createSelector(
//   selectFinishedExerciseState,
//   selectIds
// );

 

// export const selectFinishedTrainingEntities = createSelector(
//   selectFinishedExerciseState,
//   selectEntities
// );

export const selectAllFinishedTrainings = createSelector(
  selectFinishedExerciseState,
  selectAll
);

 

// export const selectFinishedTrainingTotal = createSelector(
//   selectFinishedExerciseState,
//   selectTotal
// );



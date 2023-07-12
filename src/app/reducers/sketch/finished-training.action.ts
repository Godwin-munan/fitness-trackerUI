import { createAction, props } from "@ngrx/store";
import { Exercise } from "@training/model/exercise.model";




export const setAvailableExercises = createAction(
    "[Training] set Available Training",
    props<{ availableExercise: Exercise[]}>()
);

export const setFinishedExercises = createAction(
    "[Training] set Finished Training",
    props<{ finishedExercise: Exercise[]}>()
);

export const startExercise = createAction(
    "[Training] start Training",
    props<{exerciseId: number}>()
);

export const stopExercise = createAction(
    "[Training] stop Training",
    
);





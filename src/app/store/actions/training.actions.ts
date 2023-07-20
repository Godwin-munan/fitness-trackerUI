import { createAction, props } from "@ngrx/store";
import { Exercise } from "@training/model/exercise.model";



export const startAvailableExercisesLoad = createAction("[Training] Start Loading Available Exercises");

export const loadAvailableExerciseSuccessfull = createAction(
    "[Training] Loading Available Exercise Successfull",
    props<{ availableExercise: Exercise[]}>()
)



export const startFinishedExercisesLoad = createAction(
    "[Training] Start Loading Finished Exercises",
    props<{userId: number}>());

export const loadFinishedExerciseSuccessfull = createAction(
    "[Training] Loading Finished Exercises Successfull",
    props<{ finishedExercise: Exercise[]}>()
)

export const startExercise = createAction(
    "[Training] Start Training",
    props<{exerciseId: number}>()
);

export const stopExercise = createAction("[Training] stop Training");

export const completeExercise = createAction(
    "[Training] Complete Training",
    props<{userId: number, exercise: Exercise}>()
);

export const cancelExercise = createAction(
    "[Training] Cancel Training",
    props<{userId: number, progress: number, exercise: Exercise}>()
);

import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TrainingService } from "@training/service/training.service";
import { failureMsg, startLoading, stopLoading } from "../actions/ui.actions";
import { Exercise } from "@training/model/exercise.model";
import { AppError } from "@core/error/app-error";
import { 
  loadAvailableExerciseSuccessfull, 
  loadFinishedExerciseSuccessfull, 
  startAvailableExercisesLoad, 
  startFinishedExercisesLoad} from "../actions/training.actions";
import { 
  map, 
  switchMap, 
  catchError, 
  of, 
  from,
  concatMap,
  mergeMap,
  tap,
  exhaustMap} from "rxjs";
import { Store } from "@ngrx/store";


export const loadAvailableExercisesEffect = createEffect(
  (
    action$ = inject(Actions),
    trainingService  = inject(TrainingService),
    _store = inject(Store)
  ) => {

    return action$.pipe(
      ofType(startAvailableExercisesLoad),
      // tap(() => _store.dispatch(startLoading())),
      concatMap( () => trainingService.fetchAvailableExercises().pipe(
        map(response => {
          let exercises = response.data as Exercise[];
          return exercises;
        }),
        concatMap(exercises => [
          stopLoading(),
          loadAvailableExerciseSuccessfull({availableExercise: exercises}),
        ]), 
        catchError((error: AppError) => {
          let errorMsg = error.er as string;
          return from([ stopLoading(), failureMsg({errorMsg: errorMsg }) ])
        })       
      )
      ),
    )
  },
  { functional: true}
);


export const loadFinishedExercisesEffect = createEffect(
  (
    action$ = inject(Actions),
    trainingService  = inject(TrainingService),
    _store = inject(Store)
  ) => {

    return action$.pipe(
      ofType(startFinishedExercisesLoad),
      // tap(() => _store.dispatch(startLoading())),
      concatMap((action) => trainingService.fetchCompletedOrCancelledExercises(action.userId).pipe(
        map(response => {
          console.log("Show response")
          let exercises = response.data as Exercise[];
          return exercises;
        }),
        concatMap(exercises => [
          stopLoading(),
          loadFinishedExerciseSuccessfull({ finishedExercise: exercises }),
        ]), 
        catchError((error: AppError) => {
          let errorMsg = error.er as string;
          return from([ stopLoading(), failureMsg({errorMsg: errorMsg }) ])
        })       
      )
      ),
    )
  },
  { functional: true}
);









// export const loadExercisesEffect = createEffect(
//   (
//     action$ = inject(Actions),
//     trainingService = inject(TrainingService)
//   ) => {

//     return action$.pipe(
//       ofType(startFinishedExercisesLoad),
//       switchMap(action => {
//         const startLoadingAction = startLoading(); // Dispatch the startLoading action
//         return trainingService.fetchCompletedOrCancelledExercises(action.userId).pipe(
//           map(response => {
//             let exercises = response.data as Exercise[];
//             return [startLoadingAction, exercises]; // Combine the startLoadingAction and the fetched exercises in an array
//           }),
//           catchError((error: AppError) => {
//             let errorMsg = error.er as string;
//             return from([startLoadingAction, stopLoading(), failureMsg({ errorMsg: errorMsg })]); // Dispatch the loading and failure actions on error
//           })
//         );
//       }),
//       switchMap(([startLoadingAction, exercises]) => [
//         stopLoading(), // Dispatch the stopLoading action after the asynchronous operation
//         loadFinishedExerciseSuccessfull({ finishedExercise: exercises }),
//       ])
//     );
//   },
//   { functional: true }
// );







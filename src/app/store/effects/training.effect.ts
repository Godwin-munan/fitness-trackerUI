import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TrainingService } from "@training/service/training.service";
import { failureMsg, startLoading, stopLoading } from "../actions/ui.actions";
import { Exercise } from "@training/model/exercise.model";
import { AppError } from "@core/error/app-error";
import { 
  cancelExercise,
  completeExercise,
  loadAvailableExerciseSuccessfull, 
  loadFinishedExerciseSuccessfull, 
  startAvailableExercisesLoad, 
  startFinishedExercisesLoad,
  stopExercise} from "../actions/training.actions";
import { 
  map, 
  switchMap, 
  catchError, 
  of, 
  from,
  concatMap,
  mergeMap,
  tap,
  exhaustMap,
  delay} from "rxjs";
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
      switchMap( () => trainingService.fetchAvailableExercises().pipe(
        map(response => {
          let exercises = response.data as Exercise[];
          return exercises;
        }),
        switchMap(exercises => [
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
      switchMap((action) => trainingService.fetchCompletedOrCancelledExercises(action.userId).pipe(
        map(response => {
          let exercises = response.data as Exercise[];
          return exercises;
        }),
        switchMap(exercises => [
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


export const completeExerciseEffect = createEffect(
  (
    action$ = inject(Actions),
    _trainingService = inject(TrainingService),
    _store = inject(Store)
  ) => {
    return action$.pipe(
      ofType(completeExercise),
      tap(() => _store.dispatch(startLoading())),
      map(action => {
        let exercise = _trainingService.completeExercise(action.userId, action.exercise);
        return {userId: action.userId, exercise: exercise}
      }),
      switchMap(result => _trainingService.addExecutedExercise(result.exercise, result.userId).pipe(
        switchMap(id => {

          let userId = id.data as number;
          return _trainingService.fetchCompletedOrCancelledExercises(userId)}),
        map(res => res.data as Exercise[]),
        switchMap(exercises => [
          stopExercise(), 
          stopLoading(),
          loadFinishedExerciseSuccessfull({ finishedExercise: exercises }),
        ])
      )),
      catchError((error: AppError) => {
        let errorMsg = error.er as string;
        return from([ stopLoading(), failureMsg({errorMsg: errorMsg }) ])
      })  
    )
  },
  {
    functional: true
  }
);


export const cancelExerciseEffect = createEffect(
  (
    action$ = inject(Actions),
    _trainingService = inject(TrainingService),
    _store = inject(Store)    
  ) => {
    return action$.pipe(
      ofType(cancelExercise),
      tap(() => _store.dispatch(startLoading())),
      map(action => {
        let exercise = _trainingService.cancelExercise(action.userId,action.progress, action.exercise);
        return {userId: action.userId, exercise: exercise}
      }),
      switchMap(result => _trainingService.addExecutedExercise(result.exercise, result.userId).pipe(
        switchMap(id => {

          let userId = id.data as number;
          return _trainingService.fetchCompletedOrCancelledExercises(userId)}),
        map(res => res.data as Exercise[]),
        switchMap(exercises => [
          stopExercise(), 
          stopLoading(),
          loadFinishedExerciseSuccessfull({ finishedExercise: exercises }),
        ])
      )),
      catchError((error: AppError) => {
        let errorMsg = error.er as string;
        return from([ stopLoading(), failureMsg({errorMsg: errorMsg }) ])
      })  
    )
  },
  {
    functional: true
  }
);








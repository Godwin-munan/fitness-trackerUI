import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { ApiService } from '@core/authentication/service/api/api.service';
import { Store } from '@ngrx/store';
import { startExercise } from '@fitness/global/store';
import { 
  ExecutedExerciseEndPoints, 
  ExerciseEndPoints,
  ExerciseState
  } from '@core/constant/api-constants';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(
    private _apiService: ApiService,
    private _store: Store,
    ) { }

    
  fetchAvailableExercises(){

    return this._apiService
      .get<Exercise[]>(ExerciseEndPoints.GET_EXERCISE);
  }

  completeExercise(exercise: Exercise){
    return {
      ...exercise, 
      date: new Date(),
      state: ExerciseState.COMPLETED
    };
  }

  cancelExercise( progress: number, exercise: Exercise){

    return {
      ...exercise,
      duration: exercise?.duration * (progress / 100),
      calory: exercise?.calory * (progress / 100),
      date: new Date(),
      state: ExerciseState.CANCELLED
    };
  }

  addExecutedExercise(data: Exercise, userId: number){
    return this._apiService
      .addById<number>(
        ExecutedExerciseEndPoints.ADD_EX_EXERCISE_USERID, 
        userId,
        data
        );

  }

  fetchCompletedOrCancelledExercises(userId: number){
   return this._apiService
    .getById<Exercise[]>(
      userId,
      ExecutedExerciseEndPoints.GET_EX_EXERCISE_USERID
      );
  }

}

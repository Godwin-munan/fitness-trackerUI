import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '@core/authentication/service/api/api.service';
import { 
  ExecutedExerciseEndPoints, 
  ExerciseEndPoints,
  ExerciseState
  } from '@core/constant/api-constants';
import { Store } from '@ngrx/store';
import { startExercise } from '@fitness/store/index';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public exerciseChanged = new Subject<Exercise | null>();
  public availableExercises = new Subject<Exercise[]>();
  public excutedExercises = new BehaviorSubject<Exercise[]>([]);

  private runningExercise!: Exercise | null;

  private _isLoading$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading$.asObservable();

  constructor(
    private _apiService: ApiService,
    private _store: Store,
    ) { }

  startExercise(selectedId: number){

    this._store.dispatch(startExercise({
          exerciseId: selectedId
    }));
  }

  fetchAvailableExercises(){
    
    // this._store.dispatch(startLoading());

    return this._apiService.get<Exercise[]>(ExerciseEndPoints.GET_EXERCISE)
  }

  completeExercise(userId: number, exercise: Exercise){
    return {
      ...exercise, 
      date: new Date(),
      state: ExerciseState.COMPLETED
    }
  }

  cancelExercise(userId: number, progress: number, exercise: Exercise){

    return {
      ...exercise,
      duration: exercise?.duration * (progress / 100),
      calory: exercise?.calory * (progress / 100),
      date: new Date(),
      state: ExerciseState.CANCELLED
    };
  }

  getRunningExercise(){
    return { ...this.runningExercise };
  }

  addExecutedExercise(data: Exercise, userId: number){
    return this._apiService
      .addById<number>(ExecutedExerciseEndPoints.ADD_EX_EXERCISE_USERID, userId, data)

  }

  fetchCompletedOrCancelledExercises(userId: number){
   return this._apiService.getById<Exercise[]>(userId, ExecutedExerciseEndPoints.GET_EX_EXERCISE_USERID)
  }

}

import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '@core/authentication/service/api/api.service';
import { ExecutedExerciseEndPoints, ExerciseEndPoints, ExerciseState } from '@core/constant/api-constants';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '@reducers/ui/ui.actions';
import { selectActiveTraining, selectAvailableExercises } from '@reducers/training/training.reducer';
import { activeExercise, setAvailableExercises, setFinishedExercises } from '@reducers/training/training.actions';

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

    this._store.dispatch(activeExercise.start({
          exerciseId: selectedId
    }));
  }

  fetchAvailableExercises(){
    
    this._store.dispatch(startLoading());

    this._apiService.get<Exercise[]>(ExerciseEndPoints.GET_EXERCISE).subscribe({
      next: res => { 

        this._store.dispatch(stopLoading());

        const exercises = res.data as Exercise[];

        this._store.dispatch(setAvailableExercises({
          availableExercise: exercises 
        }));
      },
      error: error => {
        this._isLoading$.next(false);
      }
    })
  }

  completeExercise(userId: number){

    this._store.select(selectActiveTraining).subscribe({
      next: exercise => {
        if(exercise) this.runningExercise = exercise;
      }
    })

    this.runningExercise = {
      ...(this.runningExercise as Exercise), 
      date: new Date(),
      state: ExerciseState.COMPLETED
    }
    this.addExecutedExercise(this.runningExercise, userId);

    this._store.dispatch(activeExercise.stop());
  }

  cancelExercise(userId: number, progress: number){

    this._store.select(selectActiveTraining).subscribe({
      next: exercise => {
        if(exercise) this.runningExercise = exercise;
      }
    })

    let exercise = {
      ...(this.runningExercise as Exercise),
      duration: (this.runningExercise as Exercise)?.duration * (progress / 100),
      calory: (this.runningExercise as Exercise)?.calory * (progress / 100),
      date: new Date(),
      state: ExerciseState.CANCELLED
    };

    this.addExecutedExercise(exercise, userId);  

    this._store.dispatch(activeExercise.stop());
  }

  getRunningExercise(){
    return { ...this.runningExercise };
  }

  private addExecutedExercise(data: Exercise, userId: number){
    this._apiService
      .addById<Exercise>(ExecutedExerciseEndPoints.ADD_EX_EXERCISE_USERID, userId, data)
        .subscribe({
          next: response => {
            this.fetchCompletedOrCancelledExercises(userId);
          }
        });
  }

  fetchCompletedOrCancelledExercises(userId: number){
   return this._apiService.getById<Exercise[]>(userId, ExecutedExerciseEndPoints.GET_EX_EXERCISE_USERID).subscribe({
    next: response => {
      const exercises = response.data as Exercise[];

      this._store.dispatch(setFinishedExercises({
          finishedExercise: exercises 
        }
      ));
    }
   })
  }

}

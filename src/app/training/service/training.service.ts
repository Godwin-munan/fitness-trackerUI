import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public exerciseChanged = new Subject<Exercise | null>();

  private availableExercisesList: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise!: Exercise | null;
  private exercises: Exercise[] = [];

  constructor() { }

  startExercise(selectedId: string){
    
    this.availableExercisesList.find(ex => {
      if(ex.id == selectedId){
        this.runningExercise = ex;
        this.exerciseChanged.next({ ...this.runningExercise });
      };
    });
  }

  get availableExercises(){
    return this.availableExercisesList.slice();
  }

  completeExercise(){
    this.exercises.push({
      ...(this.runningExercise as Exercise), 
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number){
    this.exercises.push({
      ...(this.runningExercise as Exercise),
      duration: (this.runningExercise as Exercise)?.duration * (progress / 100),
      calories: (this.runningExercise as Exercise)?.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);    
  }

  getRunningExercise(){
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises(){
    return this.exercises.slice();
  }

}

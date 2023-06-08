import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  private availableExercisesList: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise!: Exercise;

  constructor() { }

  startExercise(selectedId: string){
    this.runningExercise = this.availableExercisesList.find(ex => {
      ex.id === selectedId;
    }) as Exercise;

    this.exerciseChanged.next({ ...this.runningExercise })
  }

  get availableExercises(){
    return this.availableExercisesList.slice();
  }

}
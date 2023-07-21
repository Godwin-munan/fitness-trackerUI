import { Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { Subject, takeUntil } from 'rxjs';
import { Exercise } from 'app/training/model/exercise.model';
import { AuthService } from '@core/authentication/service/auth.service';
import { Store } from '@ngrx/store';
import { 
  cancelExercise, 
  completeExercise, 
  trainingSelectors } from '@fitness/global/store';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy{

  private destroySubject$: Subject<void> = new Subject<void>();
  exercise!: Exercise | null;
  progress: number = 0;
  timer!: any;
  userId!: number;



  constructor(
    private _dialog: MatDialog,
   private _authService: AuthService,
   private _store: Store
  ){
    this.userId = this._authService.getUser().id as number;
  }

  ngOnInit(){
    this.startOrResumeTimer();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  startOrResumeTimer(){

    this._store.select(trainingSelectors.selectActiveTraining).pipe(
      takeUntil(this.destroySubject$)
    ).subscribe({
      next: exercise => {
        this.activeExerceImp(exercise as Exercise)
      }
    })


  }

  activeExerceImp(exercise: Exercise){

    if(exercise){
      this.exercise = exercise;
      const step = exercise.duration / 100 * 1000;

      if(this.progress >= 100) return;

      this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      
      if(this.progress >= 100) {
        
        this._store.dispatch(completeExercise({
          userId: this.userId,
          exercise: exercise
        }));

        clearInterval(this.timer);
      }

      }, step);
    }


  }

  onStop(){
    clearInterval(this.timer);

    const dialogRef = this._dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroySubject$)
    ).subscribe({
      next: result => {
        if(result) {

          let ex = this.exercise as Exercise;
          this._store.dispatch(cancelExercise({
            userId: this.userId,
            progress: this.progress,
            exercise: ex
          }))
        }else {
          this.startOrResumeTimer();
        };
      }
    })
  }

  

}

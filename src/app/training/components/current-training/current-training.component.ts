import { Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { Subject, takeUntil } from 'rxjs';
import { TrainingService } from 'app/training/service/training.service';
import { Exercise } from 'app/training/model/exercise.model';
import { AuthService } from '@core/authentication/service/auth.service';
import { Store } from '@ngrx/store';
import { selectActiveTraining } from '@reducers/training/training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy{

  private destroySubject$: Subject<void> = new Subject<void>();
  progress: number = 0;
  timer!: any;
  userId!: number;



  constructor(
    private _dialog: MatDialog,
    private _trainingService: TrainingService,
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

    this._store.select(selectActiveTraining).pipe(
      takeUntil(this.destroySubject$)
    ).subscribe({
      next: exercise => {
        this.activeExerceImp(exercise as Exercise)
      }
    })


  }

  activeExerceImp(exercise: Exercise){

    if(exercise){

      const step = exercise.duration / 100 * 1000;

      if(this.progress >= 100) return;

      this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      
      if(this.progress >= 100) {
        this._trainingService.completeExercise(this.userId);
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
          this._trainingService.cancelExercise(this.userId, this.progress);
        }else {
          this.startOrResumeTimer();
        };
      }
    })
  }

  

}

import { Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { Subject, takeUntil } from 'rxjs';
import { TrainingService } from 'app/training/service/training.service';
import { Exercise } from 'app/training/model/exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy{

  private destroySubject: Subject<void> = new Subject();
  progress: number = 0;
  timer!: any;



  constructor(
    private _dialog: MatDialog,
    private _trainingService: TrainingService,
    ){

  }

  ngOnInit(){
    this.startOrResumeTimer();
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }

  startOrResumeTimer(){
    const step = (this._trainingService.getRunningExercise() as Exercise).duration / 100 * 1000;

    if(this.progress >= 100) return;

    this.timer = setInterval(() => {
    this.progress = this.progress + 1;
    
    if(this.progress >= 100) {
      this._trainingService.completeExercise();
      clearInterval(this.timer);
    }

   }, step);

  }

  onStop(){
    clearInterval(this.timer);

    const dialogRef = this._dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: result => {
        if(result) {
          this._trainingService.cancelExercise(this.progress);
        }else {
          this.startOrResumeTimer();
        };
      }
    })
  }

  

}

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy{

  @Output("trainingExit") trainingExit = new EventEmitter();
  private destroySubject: Subject<void> = new Subject();
  progress: number = 0;
  timer!: any;



  constructor(private _dialog: MatDialog){

  }

  ngOnInit(){
    this.startOrResumeTimer();
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }

  startOrResumeTimer(){

    if(this.progress >= 100) return;

    this.timer = setInterval(() => {
    this.progress = this.progress + 10;
    
    if(this.progress >= 100) clearInterval(this.timer);

   }, 1000);

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
          this.trainingExit.emit()
        }else {
          this.startOrResumeTimer();
        };
      }
    })
  }

  

}

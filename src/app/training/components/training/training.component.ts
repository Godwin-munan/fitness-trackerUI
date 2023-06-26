import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActiveTraining } from '@reducers/training/training.reducer';
import { TrainingService } from 'app/training/service/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining: boolean = false;
  exerciseSubscription!: Subscription;

  constructor(
    private _trainingService: TrainingService,
    private _store: Store
    ){}

  ngOnInit(){
    this.exerciseSubscription = this._store.select(selectActiveTraining).subscribe({
      next: exercise => {
        if(exercise){
           this.ongoingTraining = true;
          } else {
            this.ongoingTraining = false;
          };
      }
    })
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

}

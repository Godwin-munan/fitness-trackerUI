import { Component } from '@angular/core';
import { selectIsLoading, trainingSelectors } from '@fitness/global/store';
import { Store } from '@ngrx/store';
import { Exercise } from '@training/model/exercise.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  
  exercise$!: Observable<Exercise | null>;
  isloading$!: Observable<boolean>;

  constructor(
    private _store: Store
    ){}

  ngOnInit(){
    this.exercise$ = this._store
      .select(trainingSelectors.selectActiveTraining);

    this.isloading$ =  this._store.select(selectIsLoading).pipe(
      map(isLoading => {
        return isLoading;
      })
    );
  }

}

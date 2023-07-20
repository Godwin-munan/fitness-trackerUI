import { Component } from '@angular/core';
import { trainingSelectors } from '@fitness/store/index';
import { Store } from '@ngrx/store';
import { Exercise } from '@training/model/exercise.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  
  exercise$!: Observable<Exercise | null>;

  constructor(
    private _store: Store
    ){}

  ngOnInit(){
    this.exercise$ = this._store
      .select(trainingSelectors.selectActiveTraining);
  }

}

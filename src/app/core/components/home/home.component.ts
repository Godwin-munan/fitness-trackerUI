import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { trainingSelectors } from '@reducers/sketch/finishedTraining.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  totalAvlExercise$!: Observable<number>
  totalfinishedExercise$!: Observable<number>

  constructor(
    private _store: Store
  ){}

  ngOnInit(){
    this.totalAvlExercise$ = this._store.select(trainingSelectors.selectAvailableExercisesTotal);
    this.totalfinishedExercise$ = this._store.select(trainingSelectors.selectFinishedExercisesTotal);
  }

}

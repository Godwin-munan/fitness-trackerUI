import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { startAvailableExercisesLoad, trainingSelectors } from '@fitness/global/store';
import { Store } from '@ngrx/store';
import { Exercise } from '@training/model/exercise.model';
import { TrainingService } from '@training/service/training.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestResolver implements Resolve<Exercise[]> {

  constructor(
    private _store: Store,
    private _trainingService: TrainingService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exercise[]> {
    // return this._trainingService.fetchAvailableExercises().pipe(
    //   map(res => res.data as Exercise[])
    // );

    this._store.dispatch(startAvailableExercisesLoad());

    return  this._store.select(trainingSelectors.selectAllAvailableExercises);
  }
}

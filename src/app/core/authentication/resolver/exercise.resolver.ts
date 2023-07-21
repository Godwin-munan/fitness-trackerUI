import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Exercise } from '@training/model/exercise.model';
import { Observable, map, of } from 'rxjs';
import { 
  selectIsLoading, 
  startAvailableExercisesLoad, 
  trainingSelectors,
  startExercise } from '@fitness/global/store';
import { TrainingService } from '@training/service/training.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseResolver {

  constructor(
   private _store: Store,
   private _trainingService: TrainingService
  ){}

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exercise[]> {
  resolve(): Observable<Exercise[]> {
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // this._store.dispatch(startAvailableExercisesLoad());
    // console.log("Hello Resolver")

    // return  this._store.select(trainingSelectors.selectAllAvailableExercises);
    return this._trainingService.fetchAvailableExercises().pipe(
      map(res => res.data as Exercise[])
    );
  }
}

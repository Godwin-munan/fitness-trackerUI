import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectIsLoading, startAvailableExercisesLoad, startLoading, trainingSelectors } from '@fitness/store/index';
import { Store } from '@ngrx/store';
import { Exercise } from 'app/training/model/exercise.model';
import { TrainingService } from 'app/training/service/training.service';
import { Observable, Subject, delay, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // @Output("trainingStart") trainingStart = new EventEmitter<void>();

  private destroySubject$: Subject<void> = new Subject<void>();
  exercises$!: Observable<Exercise[]>;
  exerciseForm: FormGroup;
  isloading$!: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService,
    private _store: Store,
    private cdk: ChangeDetectorRef
    ){
   
    this.exerciseForm = this._fb.group({
        exercise: ['', [Validators.required,],],
    });
    
  }



  ngOnInit(){
    this.exercises$ = this._store
      .select(trainingSelectors.selectAllAvailableExercises);
    this.isloading$ =  this._store.select(selectIsLoading);
    
    
  }

  ngAfterViewInit(){
    this.fetchExercise();
  }

  ngOnDestroy(){
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  fetchExercise(){
    this._store.dispatch(startAvailableExercisesLoad());
  }

  onStartTraining() {
    this._trainingService.startExercise(this.exerciseForm.value?.exercise);
  }

}

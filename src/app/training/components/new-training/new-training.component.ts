import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectIsLoading, trainingSelectors } from '@fitness/store/index';
import { Store } from '@ngrx/store';
import { Exercise } from 'app/training/model/exercise.model';
import { TrainingService } from 'app/training/service/training.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output("trainingStart") trainingStart = new EventEmitter<void>();

  private destroySubject$: Subject<void> = new Subject<void>();
  exercises$!: Observable<Exercise[]>;
  exerciseForm: FormGroup;
  isloading$!: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService,
    private _store: Store  
    ){
   
    this.exerciseForm = this._fb.group({
        exercise: ['', [Validators.required,],],
    });
  }



  ngOnInit(){
    this.isloading$ =  this._store.select(selectIsLoading);
    
    this.exercises$ = this._store.select(trainingSelectors.selectAllAvailableExercises);

    this.fetchExercise();
  }

  ngOnDestroy(){
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  fetchExercise(){
    this._trainingService.fetchAvailableExercises();
  }

  onStartTraining() {
    this._trainingService.startExercise(this.exerciseForm.value?.exercise);
  }

}

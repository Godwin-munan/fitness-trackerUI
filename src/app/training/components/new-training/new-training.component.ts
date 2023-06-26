import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/authentication/service/auth.service';
import { Store } from '@ngrx/store';
import { selectAvailableExercises } from '@reducers/training/training.reducer';
import { selectIsLoading } from '@reducers/ui/ui.reducer';
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
    this.exercises$ = this._store.select(selectAvailableExercises);
    // this.fetchExercise();
    // this._trainingService.availableExercises.pipe(
    //   takeUntil(this.destroySubject$)
    // ).subscribe({
    //   next: exercises => {
    //     this.exercises = exercises;
    //   }
    // });
    this.fetchExercise();
  }

  ngOnDestroy(){
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  // isLoading(){
  //   this._trainingService.isLoading$.pipe(
  //     takeUntil(this.destroySubject$)
  //   ).subscribe({
  //     next: isloading => {
  //       this.isloading = isloading;
  //     }
  //   });
  // }

  fetchExercise(){
    this._trainingService.fetchAvailableExercises();
  }

  onStartTraining() {
    this._trainingService.startExercise(this.exerciseForm.value?.exercise);
  }

}

import { Store } from '@ngrx/store';
import { Exercise } from 'app/training/model/exercise.model';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { 
  FormBuilder, 
  FormGroup, 
  Validators } from '@angular/forms';
import { 
  selectIsLoading, 
  startAvailableExercisesLoad, 
  trainingSelectors,
  startExercise, 
  selectError,
  failureMsg} from '@fitness/global/store';
import { 
  ChangeDetectorRef, 
  Component, 
  OnDestroy, 
  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  private destroySubject$: Subject<void> = new Subject<void>();
  exercises$!: Observable<Exercise[]>;
  exerciseForm: FormGroup;
  isloading$!: Observable<boolean>;
  errorMsg!: string;

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _store: Store,
    private cdk: ChangeDetectorRef
    ){
   
    this.exerciseForm = this._fb.group({
        exerciseIds: ['', [Validators.required,],],
    });
    
  }



  ngOnInit(){
  
    this.exercises$ = this._store
      .select(trainingSelectors.selectAllAvailableExercises);

    this.isloading$ =  this._store.select(selectIsLoading);

    // this._store.select(selectError).pipe(
    //   takeUntil(this.destroySubject$)
    // ).subscribe({
    //   next: errorMsg => {
    //     if(errorMsg && errorMsg != null){
    //       this.errorMsg = errorMsg
    //     }
    //   }
    // });

    // this.exercises$ = this._activatedRoute.data.pipe(
    //   map(data => data?.['exercises'])
    // )

    

  }

  ngAfterViewInit(){
    this.fetchExercise();
  }

  ngOnDestroy(){
    this.destroySubject$.next();
    this.destroySubject$.complete();

    // this._store.dispatch(failureMsg({errorMsg: null}));
  }

  fetchExercise(){
    this._store.dispatch(startAvailableExercisesLoad());
  }

  onStartTraining() {
    this._store.dispatch(startExercise({
        exerciseId: this.exerciseId.value
      }
    ));
  }

  get exerciseId(){
    return this.exerciseForm.controls['exerciseIds'];
  }

}

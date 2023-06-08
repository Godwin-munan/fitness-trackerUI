import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'app/training/model/exercise.model';
import { TrainingService } from 'app/training/service/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output("trainingStart") trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];
  exerciseForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService,   
    ){
   
    this.exerciseForm = this._fb.group({
        exercise: ['', [Validators.required,],],
    });
  }

  ngOnInit(){
    this.exercises = this._trainingService.availableExercises;
  }

  onStartTraining() {
    this._trainingService.startExercise(this.exerciseForm.value?.exercise);
  }

}

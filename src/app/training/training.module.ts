import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { TrainingComponent } from './components/training/training.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class TrainingModule { }

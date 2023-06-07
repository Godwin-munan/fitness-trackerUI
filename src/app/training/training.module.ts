import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { TrainingComponent } from './components/training/training.component';
import { SharedModule } from '@shared/shared.module';
import { StopTrainingComponent } from './components/stop-training/stop-training.component';

const COMPONENT: any[] = [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent, 
    StopTrainingComponent,
]

@NgModule({
  declarations: [ ...COMPONENT, ],
  imports: [
    SharedModule,
  ],
  exports: [ ...COMPONENT, ]
})
export class TrainingModule { }

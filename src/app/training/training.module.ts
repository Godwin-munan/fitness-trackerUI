import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { TrainingComponent } from './components/training/training.component';
import { SharedModule } from '@shared/shared.module';
import { StopTrainingComponent } from './components/stop-training/stop-training.component';
import { TrainingService } from './service/training.service';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { trainingFeature } from '@reducers/training/training.reducer';
import { trainingReducer } from '@reducers/sketch/finishedTraining.reducer';
// import { trainingFeature1 } from '@reducers/sketch/finishedTraining.reducer';

const COMPONENT: any[] = [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent, 
    StopTrainingComponent,
];

const SERVICES: any[] = [
  TrainingService
];

@NgModule({
  declarations: [ ...COMPONENT, ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
  providers: [...SERVICES],
  exports: [ ...COMPONENT, ]
})
export class TrainingModule { }

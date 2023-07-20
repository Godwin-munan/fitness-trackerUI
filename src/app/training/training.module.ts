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
import { trainingReducer } from '@fitness/store/index';
import { EffectsModule } from '@ngrx/effects';
import * as LoadExercisesEffect from '@fitness/store/effects/training.effect';

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
    EffectsModule.forFeature(LoadExercisesEffect),
  ],
  
  providers: [...SERVICES],
  exports: [ ...COMPONENT, ]
})
export class TrainingModule { }

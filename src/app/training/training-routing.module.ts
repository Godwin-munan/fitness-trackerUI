import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrainingComponent } from "./components/training/training.component";
import { ExerciseResolver } from "@core/authentication/resolver/exercise.resolver";

const routes: Routes = [
  {
    path: '', 
    component: TrainingComponent,
    title: 'Fitness - Training',
    // resolve: {
    //   exercises: [() => inject(ExerciseResolver).resolve()]
    // } 
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,]
})
export class TrainingRoutingModule {}
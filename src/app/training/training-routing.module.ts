import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrainingComponent } from "./components/training/training.component";

const routes: Routes = [
  {
    path: '', 
    component: TrainingComponent,
    title: 'Fitness - Training' 
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,]
})
export class TrainingRoutingModule {}
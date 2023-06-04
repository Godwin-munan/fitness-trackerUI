import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { TrainingModule } from './training/training.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    CoreModule,
    TrainingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

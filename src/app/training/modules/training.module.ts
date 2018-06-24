// Modules
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../../shared/shared.module';

// Components
import { TrainingComponent } from '../training.component';
import { CurrentTrainingComponent } from '../components/current-training/current-training.component';
import { NewTrainingComponent } from '../components/new-training/new-training.component';
import { PastTrainingComponent } from '../components/past-training/past-training.component';
import { StopTrainingComponent } from '../components/current-training/stop-training.component';

// Routing
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    AngularFirestoreModule,
    SharedModule,
    TrainingRoutingModule
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }

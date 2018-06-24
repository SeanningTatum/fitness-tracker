import { Component, OnInit } from '@angular/core';
import { TrainingService } from './services/training.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining: Boolean = false;
  subscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.subscription = this.trainingService.exerciseEvent
      .subscribe(exercise => {
        this.onGoingTraining = (exercise) ? true : false;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

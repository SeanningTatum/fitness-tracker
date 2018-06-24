import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  subscription: Subscription;
  loadingSubscription: Subscription;
  isLoading: Boolean = true;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.subscription = this.trainingService.exercisesChanged
      .subscribe((e: Exercise[]) => {
        this.exercises = e;
      });
    this.loadingSubscription = this.uiService.loadingStateChanged
      .subscribe(state => this.isLoading = state);

    this.fetchExercises();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  fetchExercises() {
    this.trainingService.fetchExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

}

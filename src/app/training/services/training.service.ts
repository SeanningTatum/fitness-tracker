import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService } from '../../shared/ui.service';

import { Exercise } from '../models/exercise.model';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  exerciseEvent = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore, private uiService: UIService) { }

  fetchExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        // throw(new Error);
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data() as Exercise
          };
        });
      })
      .subscribe((result: Exercise[]) => {
        this.uiService.loadingStateChanged.next(false);
        this.availableExercises = result;
        this.exercisesChanged.next([...this.availableExercises]);
      }, (error: Error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openToast('Fetching exercises failed, please try again.');
        this.exerciseEvent.next(null);
      }));
  }

  startExercise(selectedId: string) {
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => {
      return ex.id === selectedId;
    });
    this.exerciseEvent.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseEvent.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
    });
    this.runningExercise = null;
    this.exerciseEvent.next(null);
  }

  stopExercise() {
    this.exerciseEvent.next(null);
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  cancelSubs () {
    this.fbSubs.forEach(subs => subs.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}

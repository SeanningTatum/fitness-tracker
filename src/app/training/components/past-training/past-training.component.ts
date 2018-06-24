import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { TrainingService } from '../../services/training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscription: Subscription;

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.subscription = this.trainingService.finishedExercisesChanged
      .subscribe((finishedExercises: Exercise[]) => {
        this.dataSource.data = finishedExercises;
      });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

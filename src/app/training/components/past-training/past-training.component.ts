import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@core/authentication/model/user.model';
import { AuthService } from '@core/authentication/service/auth.service';
import { Store } from '@ngrx/store';
import { selectFinishedExercises } from '@reducers/training/training.reducer';
import { Exercise } from 'app/training/model/exercise.model';
import { TrainingService } from 'app/training/service/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  pageSizes = [5, 10, 25];
  totalData: number = 0;
  user!: User;
  dataSource = new MatTableDataSource<Exercise >()

  exerciseSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _trainingService: TrainingService,
    private _authService: AuthService,
    private _store: Store,
  ){
    this.user = this._authService.getUser();
  }

  ngOnInit() {
    this.exerciseSubscription = this._store.select(selectFinishedExercises)
        .subscribe({
          next: data => {
            this.dataSource.data = data;
          }
    });
    
   let id = this.user.id as number;
   this._trainingService.fetchCompletedOrCancelledExercises(id);


   this.totalData = this.dataSource.data.length;
  }

  //this method execute after the view finish rendering
  ngAfterViewInit() {
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
   this.exerciseSubscription.unsubscribe();
  }

}

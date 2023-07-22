import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@core/authentication/model/user.model';
import { AuthService } from '@core/authentication/service/auth.service';

import { Store } from '@ngrx/store';
import { Exercise } from 'app/training/model/exercise.model';
import { 
  Subject, 
  takeUntil } from 'rxjs';
import { 
  selectError, 
  startFinishedExercisesLoad, 
  trainingSelectors } from '@fitness/global/store';
import { 
  AfterViewInit, 
  Component, 
  OnDestroy, 
  OnInit, 
  ViewChild } from '@angular/core';
  

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroySubject$: Subject<void> = new Subject<void>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  pageSizes = [5, 10, 25];
  totalData: number = 0;
  user!: User;
  dataSource = new MatTableDataSource<Exercise >()
  errorMsg!: string;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _authService: AuthService,
    private _store: Store,
  ){
    this.user = this._authService.getUser();
  }

  ngOnInit() {

    this._store
      .select(trainingSelectors.selectAllFinishedExercises).pipe(
        takeUntil(this.destroySubject$))
          .subscribe({
            next: data => {
              this.dataSource.data = data;
            }
        });


    // this._store.select(selectError).pipe(
    //   takeUntil(this.destroySubject$)
    // ).subscribe({
    //   next: errorMsg => {
    //     if(errorMsg && errorMsg != null){
    //       this.errorMsg = errorMsg
    //     }
    //   }
    // });

    
   let id = this.user.id as number;
   this._store.dispatch(startFinishedExercisesLoad({userId: id}));

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
    this.destroySubject$.next();
    this.destroySubject$.complete();

  //  this._store.dispatch(failureMsg({errorMsg: null}));
   console.log(`Destroyer`);
  }

}

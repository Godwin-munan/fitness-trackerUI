import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'app/training/model/exercise.model';
import { TrainingService } from 'app/training/service/training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  pageSizes = [5, 10, 25];
  totalData: number = 0;
  dataSource = new MatTableDataSource<Exercise >()

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _trainingService: TrainingService,
  ){}

  ngOnInit() {
   this.dataSource.data = this._trainingService.getCompletedOrCancelledExercises();
   this.totalData = this.dataSource.data.length
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
   
  }

}

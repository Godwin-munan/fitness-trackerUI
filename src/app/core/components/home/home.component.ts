import { Component } from '@angular/core';
import { trainingSelectors } from '@fitness/store/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(
    private _store: Store
  ){}

  ngOnInit(){}

}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoading } from '@fitness/global/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isloading$!: Observable<boolean>;

  constructor(
    private _store: Store
    ){}

  ngOnInit(){
    this.isloading$ = this._store.select(selectIsLoading);
  }
}

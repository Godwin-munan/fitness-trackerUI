import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/authentication/service/auth.service';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@reducers/auth/auth.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit{

  @Output("closeSidenav") closeSidenav = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;
  authSubcription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _store: Store,
  ){}

  ngOnInit(){
    this.isAuth$ = this._store.select(selectIsAuthenticated);
  }

  onLogout(){
    this.onClose();
    this._authService.logout();
  }

  onClose(){
    this.closeSidenav.emit();
  }
}

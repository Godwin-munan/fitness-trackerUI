import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/authentication/service/auth.service';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@reducers/auth/auth.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output("sidenavToggle") sidenavToggle = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;
  authSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _store: Store,
    ){

  } 

  ngOnInit(){
    this.isAuth$ = this._store.select(selectIsAuthenticated);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  } 

  onLogout(){
    this._authService.logout();
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
}

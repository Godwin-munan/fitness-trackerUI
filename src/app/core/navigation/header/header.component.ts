import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/authentication/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output("sidenavToggle") sidenavToggle = new EventEmitter<void>();
  isAuth!: boolean;
  authSubscription!: Subscription;

  constructor(
    private _authService: AuthService
    ){

  } 

  ngOnInit(){
    this.authSubscription = this._authService.authChange.subscribe({
      next: status => {
        this.isAuth = status;
      }
    });
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

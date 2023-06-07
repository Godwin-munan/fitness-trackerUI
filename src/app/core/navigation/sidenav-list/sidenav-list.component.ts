import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/authentication/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy{

  @Output("closeSidenav") closeSidenav = new EventEmitter<void>();
  isAuth!: boolean;
  authSubcription!: Subscription;

  constructor(
    private _authService: AuthService,
  ){}

  ngOnInit(){
    this._authService.authChange.subscribe({
      next: status => {
        this.isAuth = status;
      }
    });
  }

  ngOnDestroy(){
    this.authSubcription.unsubscribe();
  }

  onLogout(){
    this.onClose();
    this._authService.logout();
  }

  onClose(){
    this.closeSidenav.emit();
  }
}

import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '@core/constant/api-constants';
import { SnackbarComponent } from '@shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private className: string = Constants.SUCCESS_SNACKBAR;

  constructor(
    private _snackbar: MatSnackBar,
    private _zone: NgZone,
  ) { 
     
  }

  openSnackBar(message: string, error?: string){

    if(error) this.className = Constants.ERROR_SNACKBAR;

    this._snackbar.openFromComponent(SnackbarComponent, {
      data: {
        message: message
      },
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [this.className],      
    })
  }
}

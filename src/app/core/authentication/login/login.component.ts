import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '@reducers/ui/ui.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginform: FormGroup;
  hintStart: any = 'start';
  hintEnd: any = 'end';
  isloading$!: Observable<boolean>

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _store: Store,
    ){

    this.loginform = this._fb.group({
      email: ['', [Validators.required,],],
      password: ['', [Validators.required,],],

    })
  }

  ngOnInit(){
    this.isloading$ = this._store.select(selectIsLoading);
  }

  onLogin(){
    this._authService.login({
      username: this.emailControl.value,
      password: this.passwordControl.value
    });
  }

  get emailControl(){
    return this.loginform.controls['email'];
  }

  get passwordControl(){
    return this.loginform.controls['password'];
  }
}

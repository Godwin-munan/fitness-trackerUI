import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoading, startLogin } from '@fitness/store/index';
import { AuthData } from '../model/auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginform: FormGroup;
  hintStart: any = 'start';
  hintEnd: any = 'end';
  isloading$: Observable<boolean> = of(false);
  showPassword: boolean = false;

  constructor(
    private _fb: FormBuilder,
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
    const authData = {
      username: this.emailControl.value,
      password: this.passwordControl.value
    } as AuthData;

    this._store.dispatch(startLogin({authData}));

  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  get emailControl(){
    return this.loginform.controls['email'];
  }

  get passwordControl(){
    return this.loginform.controls['password'];
  }
}

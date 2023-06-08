import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginform: FormGroup;
  hintStart: any = 'start';
  hintEnd: any = 'end';

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    ){

    this.loginform = this._fb.group({
      email: ['', [Validators.required,],],
      password: ['', [Validators.required,],],

    })
  }

  onLogin(){
    this._authService.login({
      email: this.emailControl.value,
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoading, startRegistration } from '@fitness/store/index';
import { SignUpData } from '../model/signup.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  
  signupform: FormGroup;
  maxDate!: Date;
  hintStart: any = 'start';
  hintEnd: any = 'end'; 
  isloading$!: Observable<boolean>;
  showPassword: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _store: Store,
    ){

    this.signupform = this._fb.group({
      email: ['', [Validators.required,],],
      password: ['', [Validators.required,],],
      birthdate: ['', [Validators.required,],],
      terms: ['', [Validators.required,],],
    });

    this.isloading$ = this._store.select(selectIsLoading)
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 19);
  }


  onSignup(){

    const signUpData = {
      username: this.emailControl.value,
      password: this.passwordControl.value,
      birthday: this.birthdayControl.value
    } as SignUpData;

    this._store.dispatch(startRegistration({signUp: signUpData}));

  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  get emailControl(){
    return this.signupform.controls['email'];
  }

  get passwordControl(){
    return this.signupform.controls['password'];
  }

  get birthdayControl(){
    return this.signupform.controls['birthdate'];
  }

}

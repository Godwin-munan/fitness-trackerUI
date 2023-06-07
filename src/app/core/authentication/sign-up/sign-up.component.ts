import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

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

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    ){

    this.signupform = _fb.group({
      email: ['', [Validators.required,],],
      password: ['', [Validators.required,],],
      birthdate: ['', [Validators.required,],],
      terms: ['', [Validators.required,],],
    })
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 19);
  }

  onSignup(){
    this._authService.registerUser({
      email: this.emailControl.value,
      password: this.passwordControl.value
    });
  }

  get emailControl(){
    return this.signupform.controls['email'];
  }

  get passwordControl(){
    return this.signupform.controls['password'];
  }

}

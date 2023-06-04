import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  Signupform: FormGroup;
  maxDate!: Date;
  hintStart: any = 'start';
  hintEnd: any = 'end';

  constructor(private _fb: FormBuilder){
    this.Signupform = _fb.group({
      email: ['', [Validators.required,],],
      password: ['', [Validators.required,],],
      birthdate: ['', [Validators.required,],],
    })
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 19);
  }

  onSignup(){
    console.log("submit object: ", this.Signupform);
  }

  get emailControl(){
    return this.Signupform.controls['email'];
  }

  get passwordControl(){
    return this.Signupform.controls['password'];
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup,AbstractControl,ValidatorFn, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm!:FormGroup;
  hide = false;
  constructor() { }

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{1,}$'),Validators.minLength(3)]),
      lastName: new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}([\\s]{0,1}[A-Za-z]{1,})*$'),Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^.,:;!@#$%^&*_+=|(){}\/\\[?-]*[.,:;!@#$%^&*_+=|(){}\/\\[?-][^.,:;!@#$%^&*_+=|(){}\/\\[?-]*$).{8,}$')]),
      confirm:new FormControl('',Validators.required)
    })
   
  }
}

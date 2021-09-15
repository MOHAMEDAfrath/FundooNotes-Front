import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!:FormGroup;
  hide=true;
  constructor() { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^.,:;!@#$%^&*_+=|(){}\/\\[?-]*[.,:;!@#$%^&*_+=|(){}\/\\[?-][^.,:;!@#$%^&*_+=|(){}\/\\[?-]*$).{8,}$')])
    })
  }

}

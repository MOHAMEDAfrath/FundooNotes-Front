import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
    ForgotForm! : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.ForgotForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email])
    })

  }
  getEmail(){
    return this.ForgotForm.get('email')?.value;
  }
}

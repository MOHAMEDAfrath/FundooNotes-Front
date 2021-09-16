import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { UserserviceService } from 'src/app/Service/UserService/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm!:FormGroup;
  hide = false;
  constructor(
    private userService: UserserviceService
    ) {}

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{1,}$'),Validators.minLength(3)]),
      lastName: new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}([\\s]{0,1}[A-Za-z]{1,})*$'),Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}')]),
      confirm:new FormControl('',Validators.required)
    })
   
  }
  Register(){
    this.userService.Register(this.RegisterForm.value)
    .subscribe((status : any)=>{
      console.log(status);
    })

  }

}

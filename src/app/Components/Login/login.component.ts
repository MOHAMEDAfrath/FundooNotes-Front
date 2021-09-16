import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { UserserviceService } from 'src/app/Service/UserService/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  LoginForm!:FormGroup;
  hide=true;
  constructor(private userService: UserserviceService
    ,private snackBar: MatSnackBar,
    private route:Router) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}')])
    })
  }
  Login(){
    if(!this.LoginForm.invalid){
      this.loading = true;
      this.userService.Login(this.LoginForm.value)
      .subscribe((result : any)=>{
          if(result.status == true){
            this.loading = false;
            this.snackBar.open(result.message,'',{duration:2500});
          }
      },(error: HttpErrorResponse) => {
        if(error.error.message == "Login Failed ,Invalid Credentials !"){
          this.loading = false;
        this.snackBar.open(error.error.message,'',{duration:2500});
        }
        else{
          this.loading = false;
          this.snackBar.open(error.error.message,'',{duration:2500});
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { UserserviceService } from 'src/app/Service/UserService/userservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
    ForgotForm! : FormGroup;
    loading = false;
  constructor(
    private userService : UserserviceService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ForgotForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email])
    })

  }
  forgot(){
    this.loading = true;
    if(!this.ForgotForm.invalid){
      this.userService.Forgot(this.ForgotForm.value)
      .subscribe((result:any)=>{
        if(result.status == true){
          this.snackBar.open(result.message,'',{duration:2500});
          this.loading = false;
        }
      },(error: HttpErrorResponse) => {
        if(error.error.message == "Email not Exists ! Please Register ! "){
        this.snackBar.open(error.error.message,'',{duration:2500});
        }
        else{
          this.snackBar.open(error.error.message,'',{duration:2500});
        }
      });
    }
  }
}

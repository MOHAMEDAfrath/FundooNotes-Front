import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserserviceService } from 'src/app/Service/UserService/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  token = '';
  hide = false;
  email = '';
  ResetForm!: FormGroup;
  disState = true;
  constructor(
    private route: ActivatedRoute,
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.token += params.get('token');
      
    });
    this.check(this.token);
    this.ResetForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'
        ),
      ]),
      confirm: new FormControl('', Validators.required),
    });
  }
  Reset() {
    if (!this.ResetForm.invalid) {
      this.userService
        .Reset(this.email, this.ResetForm.value)
        .subscribe((result: any) => {
          this.snackBar.open(result.message, '', { duration: 2500 });
          if (result.status == true) {
            this.router.navigateByUrl('/login');
          }
        });
    }
  }
  check(data : any){
    this.userService.check(data).subscribe((result:any)=>{
       if(result.message == "Token Valid"){
            
         this.email = result.data.emailId
         console.log(result.data);
       }
    },
    (error: HttpErrorResponse) => {
      if (error.error.message == 'Token Expired') {
        this.disState = false;
        this.snackBar.open("Token Expired! Please send another request!",'');
      }
    }
  );
  }
}

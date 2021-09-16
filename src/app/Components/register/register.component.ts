import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserserviceService } from 'src/app/Service/UserService/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  RegisterForm!: FormGroup;
  hide = false;
  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-z]{1,}$'),
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-z]{2,}([\\s]{0,1}[A-Za-z]{1,})*$'),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'
        ),
      ]),
      confirm: new FormControl('', Validators.required),
    });
  }
  Register() {
    if (!this.RegisterForm.invalid) {
      this.loading = true;
      this.userService
        .Register(this.RegisterForm.value)
        .subscribe((result: any) => {
          console.log(result);
          if (result.status == true) {
            this.loading=false
            this.snackBar.open(result.message, '', { duration: 2500 });
            this.router.navigateByUrl('/login');
          } else {
            this.loading=false;
            this.snackBar.open(result.message, '', { duration: 2500 });
          }
        },(error: HttpErrorResponse) => {
          if(error.error.message == "Email Already Exists! Please Login"){
            this.loading = false
          this.snackBar.open(error.error.message,'',{duration:2500});
          this.router.navigateByUrl('/login');
          }
          else{
            this.loading = false;
            this.snackBar.open(error.error.message,'',{duration:2500});
          }
        });
    }
  }
}

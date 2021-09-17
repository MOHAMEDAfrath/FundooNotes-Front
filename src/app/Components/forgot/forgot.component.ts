import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserserviceService } from 'src/app/Service/UserService/userservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  ForgotForm!: FormGroup;
  loading = false;
  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ForgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  forgot() {
    if (!this.ForgotForm.invalid) {
      this.loading = true;
      this.userService.Forgot(this.ForgotForm.value).subscribe(
        (result: any) => {
          this.loading = false;
          this.snackBar.open(result.message, '', { duration: 2500 });
          if (result.status == true) {
            this.router.navigateByUrl('/login');
            this.LocalStorage(result.data);
          }
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.snackBar.open(error.error.message, '', { duration: 2500 });
          if (error.error.message == 'Email not Exists ! Please Register ! ') {
            this.router.navigateByUrl('/register');
          }
        }
      );
    }
  }
  LocalStorage(data: any) {
    var reset = localStorage.getItem('Reset');
    if (reset != null) {
      localStorage.removeItem('Reset');
    }
    reset = data;
    localStorage.setItem('Reset', JSON.stringify(reset));
  }}

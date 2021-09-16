import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserserviceService } from 'src/app/Service/UserService/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  email = "";
  hide = false;
  ResetForm!:FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userService: UserserviceService,
    private snackBar : MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=> {
      this.email+=params.get('email');
    });
    this.ResetForm = new FormGroup({
      password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}')]),
      confirm:new FormControl('',Validators.required)
    })
  }
  Reset(){
    if(!this.ResetForm.invalid){
        this.userService.Reset(this.email,this.ResetForm.value)
        .subscribe((result : any)=>{
          if(result.status == true){
            this.snackBar.open(result.message,'',{duration:2500});
            this.router.navigateByUrl('/login');
          }
        })
    }
  }
  
}

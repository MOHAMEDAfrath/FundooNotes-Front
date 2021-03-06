import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/Service/notesService/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { FormGroup } from '@angular/forms';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  Name = '';
  Email = '';
  userId=0;
  isGrid = true;
  isSearch = false;
  isOption = 1;
  isOptions:string='';
  searchInp = "";
  expand =true;
  toggle = false;
  clickSearch = true;
  searchIcon = true;
  userLabels = [];
  labelDetails:any;
  constructor(private route : Router,private noteservice: NotesService,
    public dialog : MatDialog,) { }

  ngOnInit(): void {
    this.checkLocalStorage()
    this.getFromLocalStorage()
    this.getLabels();
  }
  async getFromLocalStorage(){
      var user = JSON.parse(localStorage.getItem("FundooUser")!);
      this.Name = user.userName;
      this.Email = user.emailId;
      this.userId= user.userId;
  }
  Logout(){
    var user = JSON.parse(localStorage.getItem("FundooUser")!);
      if(user != null){
          localStorage.removeItem("FundooUser");
          this.route.navigateByUrl('/login');
      }
  }
  changeSearch(event:any){
      console.log(event.target.value)
      return event.target.value;
  }
  checkLocalStorage(){
    var user = localStorage.getItem('FundooUser');
    if(user == null){
      this.route.navigateByUrl('/login');
    }
  }
  getLabels(){
    this.noteservice.getLabels().
    subscribe((result:any)=>{
        this.userLabels = result.data;
        console.log(result)
    })
  }
  openDialog(){
    let dialogref = this.dialog.open(EditDialogComponent,{data:{userId:this.userId,labels: this.userLabels}});
 }
}
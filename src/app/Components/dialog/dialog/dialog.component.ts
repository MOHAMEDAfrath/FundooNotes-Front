import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Service/notesService/notes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  colab_email:any="";
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private notesservice:NotesService,private snack:MatSnackBar,
  private dialogRef: MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {

  }
  changeText(event:any){
      return event.target.value;
    }
    addColab(colab:any){
      if(colab!=this.user.emailId){
      this.notesservice.checkEmail(colab).
      subscribe((result:any)=>{
        this.data.collab.push({email:colab,name:result.data});
      })
    }else{
        this.snack.open('Owner Exists !','',{duration:3000});
    }
  }
  close(){
    this.dialogRef.close(this.data.collab);
  }
 }

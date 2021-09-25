import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotesService } from 'src/app/Service/notesService/notes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  colab_email: any = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notesservice: NotesService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}
  ngOnInit(): void {}
  changeText(event: any) {
    return event.target.value;
  }
  addColab(colab: any) {
    if (colab.colEmail != this.user.emailId) {
      this.notesservice.checkEmail(colab).subscribe((result: any) => {
        console.log(colab)
        this.data.collab.push({colEmail:colab});
      });
    } else {
      this.snack.open('Owner Exists !', '', { duration: 3000 });
    }
  }
  save() {
    this.dialogRef.close(this.data.collab);
  }
  close() {
    this.data.collab = [];
    this.dialogRef.close(this.data.collab);
  }
  clear(colab:any){
      if(this.data.delete == true){
        console.log("remove");
        this.delete(colab.colId);
      }
      this.data.collab.splice(this.data.collab.indexOf(colab),1);
  }
  delete(colab:any){
    console.log(colab)
    this.notesservice.deleteColab(colab)
    .subscribe((result:any)=>{
        console.log(result);
    })
  }
}

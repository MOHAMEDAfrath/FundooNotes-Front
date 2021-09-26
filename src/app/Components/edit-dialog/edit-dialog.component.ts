import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataserviceService } from 'src/app/Service/dataService/dataservice.service';
import { NotesService } from 'src/app/Service/notesService/notes.service';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditDialogComponent>,private noteservice:NotesService,private dataservice:DataserviceService) { }
  labelName="";
  editLabelName ='';
  edit=false;
  click=false;
  ngOnInit(): void {
  }
  addLabel(){
    this.noteservice.addLabel(this.data.userId,this.labelName).
    subscribe((result:any)=>{
      this.dataservice.changeMessage(true);
      console.log(result);
    })
  }
  editLabel(data:any){
    console.log(data,this.editLabelName);
    this.noteservice.editLabel(data,this.editLabelName)
    .subscribe((result:any)=>{
      this.dataservice.changeMessage(true);
      console.log(result);
    })

  }
  change(event:any){
      this.editLabelName = event.target.value;
  }
  deleteLabel(data:any){
      this.noteservice.deleteLabel(data['labelName'])
      .subscribe((result:any)=>{
        this.dataservice.changeMessage(true);
        console.log(result);
      })
  }
}

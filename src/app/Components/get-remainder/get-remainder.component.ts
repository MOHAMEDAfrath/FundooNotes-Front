import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';
import { NotesService } from 'src/app/Service/notesService/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { DataserviceService } from 'src/app/Service/dataService/dataservice.service';
 
@Component({
  selector: 'app-get-remainder',
  templateUrl: './get-remainder.component.html',
  styleUrls: ['./get-remainder.component.scss'],
encapsulation: ViewEncapsulation.None
})
export class GetRemainderComponent implements OnInit {
 
  remainderNotes=[];
  constructor(private noteservice:NotesService,
    private dialog:MatDialog,
    private data:DataserviceService) { }

  ngOnInit(): void {
    this.getRemainder();
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.getRemainder();
        this.data.changeMessage(false);
      }
  })
  }
  
  openNoteDialog(notes:any){
    let dialogref = this.dialog.open(NotesdialogComponent,{data:{notes}});
    dialogref.afterClosed().subscribe((result)=>{
      console.log(result);
     })
  }
 getRemainder(){
 this.noteservice.getRemainder().subscribe((result:any)=>{
   console.log(result.data);
   this.remainderNotes = result.data;
 })
 }
}

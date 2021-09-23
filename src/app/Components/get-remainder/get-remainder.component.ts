import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';
import { NotesService } from 'src/app/Service/notesService/notes.service';
import { MatDialog } from '@angular/material/dialog';
 
@Component({
  selector: 'app-get-remainder',
  templateUrl: './get-remainder.component.html',
  styleUrls: ['./get-remainder.component.scss'],
encapsulation: ViewEncapsulation.None
})
export class GetRemainderComponent implements OnInit {
 
  remainderNotes=[];
  constructor(private noteservice:NotesService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getRemainder();
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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';
import { NotesService } from 'src/app/Service/notesService/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataserviceService } from 'src/app/Service/dataService/dataservice.service';
 
 
@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss'],
encapsulation:ViewEncapsulation.None
})
export class GetArchiveComponent implements OnInit {
  archiveNotes=[];
  constructor(private noteservice:NotesService,
    private dialog:MatDialog,
    private snack:MatSnackBar,
    private data:DataserviceService) { }

  ngOnInit(): void {
    this.getArchive();
    this.data.currentMessage.subscribe((change)=>{
        if(change == true){
          this.getArchive();
          this.data.changeMessage(false);
        }
    })
  }

 getArchive(){
 this.noteservice.getArchive().subscribe((result:any)=>{
   console.log(result.data);
   this.archiveNotes = result.data;
 })
 }
 openNoteDialog(notes:any){
  let dialogref = this.dialog.open(NotesdialogComponent,{data:{notes}});
  dialogref.afterClosed().subscribe((result)=>{
    console.log(result);
   })
}

}

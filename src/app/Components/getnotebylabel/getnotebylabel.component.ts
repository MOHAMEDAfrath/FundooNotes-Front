import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Service/notesService/notes.service';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';

@Component({
  selector: 'app-getnotebylabel',
  templateUrl: './getnotebylabel.component.html',
  styleUrls: ['./getnotebylabel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GetnotebylabelComponent implements OnInit {
  @Input() label:any;
  constructor(private noteservice:NotesService,
    private dialog:MatDialog,
    private snack : MatSnackBar) { }
    user= JSON.parse(localStorage.getItem('FundooUser')!)
    userNotes=[];
  ngOnInit(): void {
    this.getLabelByNote();
  }
  getLabelByNote(){
    this.noteservice.getNotesByLabel(this.user.userId,this.label.labelName)
    .subscribe((result:any)=>{
      this.userNotes = result.data;
      console.log(this.userNotes);
    })
  }
  openNoteDialog(notes:any){
    let dialogref = this.dialog.open(NotesdialogComponent,{data:{notes}});
    dialogref.afterClosed().subscribe((result)=>{
      console.log(result);
     })
  }

}

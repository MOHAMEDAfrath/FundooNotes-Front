import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Service/notesService/notes.service';
import { DialogComponent } from '../dialog/dialog/dialog.component';

@Component({
  selector: '[Create-Note]',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  dispNote = false;
  DescNote: string = '';
  TitleNote: string = '';
  NotesForm!: FormGroup;
  animal: string = '';
  name: string = (JSON.parse(localStorage.getItem('FundooUser')!)).userName;
  constructor(
    private noteservice: NotesService,
    private snackBar: MatSnackBar,
    public dialog : MatDialog
  ) {}
  
  ngOnInit(): void {
    this.NotesForm = new FormGroup({
      title: new FormControl(''),
      Desc: new FormControl(''),
    });
  }
  createNote() {
    if (this.NotesForm.value.title != '' || this.NotesForm.value.Desc != '') {
      this.noteservice
        .CreateNote(this.NotesForm.value)
        .subscribe((result: any) => {
          if (result.status == true) {
            this.snackBar.open(result.message, '', { duration: 3000 });
          }
        });
    }
  }
  openDialog(){
     let dialogref = this.dialog.open(DialogComponent,{data:{name : this.name}});
  }
  autogrow() {
    var textArea = document.getElementById('notes')!;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  checkMenu(event: any) {
    return event.target.value;
  }
}

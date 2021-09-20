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
  dayArr = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
  monthArr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
  //toolColor = ['white','Red','orange','yellow','green','teal','blue','darkblue','purple','pink','brown','grey']
  colourArr = [{colour:'white',tooltip:'White'},{colour:'#f28b82',tooltip:'Red'},{colour:'#fbbc04',tooltip:'Orange'},{colour:'#fff475',tooltip:'Yellow'},{colour:'#ccff90',tooltip:'Green'},{colour:'#a7ffeb',tooltip:'Teal'},{colour:'#cbf0f8',tooltip:'Blue'},{colour:'#aecbfa',tooltip:'Dark Blue'},{colour:'#d7aefb',tooltip:'Purple'},{colour:'#fdcfe8',tooltip:'Pink'}
  ,{colour:'#e6c9a8',tooltip:'Brown'},{colour:'#e8eaed',tooltip:'Gray'}]
  remainder :string='';
  addRemainder:string='';
  selectable = true;
  removable = true;
  addOnBlur = true;
  setColor = "white";
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
    this.getDate();
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
  getDate(){
    let date = new Date().getDay();
    this.remainder = this.dayArr[date]+", 8:00AM";
  }
  setRemainder(){
    let date = new Date();
     date.setDate(date.getDate()+7);
    this.addRemainder= this.monthArr[date.getMonth()]+" "+date.getDate()+", 8:00AM";
    console.log(this.addRemainder)
  }
}

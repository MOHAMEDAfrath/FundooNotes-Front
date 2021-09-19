import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/Service/UserService/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    private userservice: UserserviceService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.NotesForm = new FormGroup({
      title: new FormControl(''),
      Desc: new FormControl(''),
    });
  }
  createNote() {
    if (this.NotesForm.value.title != '' || this.NotesForm.value.Desc != '') {
      this.userservice
        .CreateNote(this.NotesForm.value)
        .subscribe((result: any) => {
          if (result.status == true) {
            this.snackBar.open(result.message, '', { duration: 3000 });
          }
        });
    }
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: '[Create-Note]',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  dispNote = false;
  DescNote :string= ''
  TitleNote:string='';
  constructor() {
  }
  ngOnInit(): void {

  }
  autogrow(){
    var textArea = document.getElementById("notes")!      
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  checkMenu(event:any){
      return event.target.value;
  }
}

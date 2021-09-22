import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Service/notesService/notes.service';

@Component({
  selector: 'app-get-trash',
  templateUrl: './get-trash.component.html',
  styleUrls: ['./get-trash.component.scss']
})
export class GetTrashComponent implements OnInit {

  constructor(private noteservice:NotesService) { }
  trashNotes=[];
  ngOnInit(): void {
    this.getTrash()
  }
  getTrash(){
    this.noteservice.getTrash().
    subscribe((result:any)=>{
      this.trashNotes = result.data;
      console.log(result.data);
    })
  }
}

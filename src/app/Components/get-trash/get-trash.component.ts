import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Service/notesService/notes.service';

@Component({
  selector: 'app-get-trash',
  templateUrl: './get-trash.component.html',
  styleUrls: ['./get-trash.component.scss']
})
export class GetTrashComponent implements OnInit {

  constructor(private noteservice:NotesService,
    private snack : MatSnackBar) { }
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
  restore(data:any){
    this.noteservice.restore(data['notesId']).
    subscribe((result:any)=>{
        this.snack.open(result.message,'',{duration:3000});
        this.ngOnInit();
    })
  }
  deleteFromTrash(data:any){
    this.noteservice.deleteFromTrash(data['notesId'])
    .subscribe((result:any)=>{
      this.snack.open(result.message,'',{duration:3000});
      this.ngOnInit();
    })
  }
}

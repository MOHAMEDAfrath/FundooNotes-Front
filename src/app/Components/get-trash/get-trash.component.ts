import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataserviceService } from 'src/app/Service/dataService/dataservice.service';
import { NotesService } from 'src/app/Service/notesService/notes.service';

@Component({
  selector: 'app-get-trash',
  templateUrl: './get-trash.component.html',
  styleUrls: ['./get-trash.component.scss']
})
export class GetTrashComponent implements OnInit {

  constructor(private noteservice:NotesService,
    private snack : MatSnackBar,
    private data:DataserviceService) { }
  trashNotes=[];
  ngOnInit(): void {
    this.getTrash()
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.getTrash();
        this.data.changeMessage(false);
      }
  })
    
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
      this.data.changeMessage(true);
        this.snack.open(result.message,'',{duration:3000});
    })
  }
  deleteFromTrash(data:any){
    this.noteservice.deleteFromTrash(data['notesId'])
    .subscribe((result:any)=>{
      this.data.changeMessage(true);
      this.snack.open(result.message,'',{duration:3000});
    })
  }
  emptyTrash(){
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    this.noteservice.emptyTrash(user.userId).
    subscribe((result:any)=>{
      this.data.changeMessage(true);
      this.snack.open(result.message,'',{duration:3000});
    })
  }

}

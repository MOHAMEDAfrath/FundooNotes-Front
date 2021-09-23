import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Service/notesService/notes.service';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  Name = '';
  Email = '';
  dispNote = false;
  dayArr = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
  monthArr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
  colourArr = [{colour:'white',tooltip:'White'},{colour:'#f28b82',tooltip:'Red'},{colour:'#fbbc04',tooltip:'Orange'},{colour:'#fff475',tooltip:'Yellow'},{colour:'#ccff90',tooltip:'Green'},{colour:'#a7ffeb',tooltip:'Teal'},{colour:'#cbf0f8',tooltip:'Blue'},{colour:'#aecbfa',tooltip:'Dark Blue'},{colour:'#d7aefb',tooltip:'Purple'},{colour:'#fdcfe8',tooltip:'Pink'}
  ,{colour:'#e6c9a8',tooltip:'Brown'},{colour:'#e8eaed',tooltip:'Gray'}]
  collaboratorArr=[];
  remainder :string='';
  addRemainder:string='';
  tickcolor = "white";
  setColor = "white";
  pinned=false;
  startDate:any;
  timemenu = false;
  isarchive = false;
  timeValue = "8:00AM"
  usernotes=[];
  constructor(private noteservice:NotesService,
    private dialog:MatDialog,
    private snack:MatSnackBar) { }
  @Input() notes!:any;
  ngOnInit(): void {
    this.getFromLocalStorage();
    this.getDate()
  }
  async getFromLocalStorage(){
    var user = JSON.parse(localStorage.getItem("FundooUser")!);
    this.Name = user.userName;
    this.Email = user.emailId;
}
  getDate(){
    let date = new Date().getDay();
    this.remainder = this.dayArr[date]+", 8:00AM";
   }
   setRemainder(){
    let date = new Date();
     date.setDate(date.getDate()+7);
    this.addRemainder= this.monthArr[date.getMonth()]+" "+date.getDate()+", 8:00AM";
    this.startDate = date;
    console.log(this.addRemainder)
   }
   set(){
    this.startDate = new Date();
   }
   setTom(){
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate()+1);    
   }
   getDateTime(data:any,time:any){
    console.log(data)
    console.log(time)
    var date = new Date();
    var today = this.monthArr[date.getMonth()]+" "+date.getDate()+","+date.getFullYear();
    console.log(today)
    if(data == today){
        data = "Today"
    }
    date.setDate(date.getDate()+1);
    var tom = this.monthArr[date.getMonth()]+" "+date.getDate()+","+date.getFullYear();
    if(data == tom){
      console.log(tom);
      data="Tommorow"
    }    
    //console.log(today);
    this.addRemainder = data+", "+time
   }
  pin(notes:any){
    console.log(notes['is_Pin'],this.pinned);
    this.pinned = notes['is_Pin'];
    notes['is_Pin'] = !this.pinned;
    this.noteservice.pin(notes.notesId).
    subscribe((result:any)=>{
        this.snack.open(result.message,'',{duration:3000});
    })
  }
  archive(notes:any){
    console.log(notes['is_Archive'],this.isarchive);
    this.isarchive = notes['is_Pin'];
    notes['is_Archive'] = !this.isarchive;
    this.noteservice.archive(notes.notesId).
    subscribe((result:any)=>{
        this.snack.open(result.message,'',{duration:3000});
    })
  }
  setColour(note:any,color:any){
    console.log(note['color']);
    note['color'] = color;
    console.log(note['color'])
    this.noteservice.updatecolor(note.notesId,color)
    .subscribe((result:any)=>{
      this.snack.open(result.message,'',{duration:3000})
    })
    }
    openNoteDialog(notes:any){
      let dialogref = this.dialog.open(NotesdialogComponent,{data:{notes}});
      dialogref.afterClosed().subscribe((result)=>{
        console.log(result);
       })
    }
    openDialog(){
      let dialogref = this.dialog.open(DialogComponent,{data:{name : this.Name,email:this.Email, collab: this.collaboratorArr}});
      dialogref.afterClosed().subscribe((result)=>{
        console.log(result);
        this.collaboratorArr = result;
       })
    }
}

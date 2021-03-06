import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Service/notesService/notes.service';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';
import { NativeDateAdapter, DateAdapter,
  MAT_DATE_FORMATS } from '@angular/material/core';
 import { formatDate } from '@angular/common';
 import { DatePipe } from '@angular/common';
import { DataserviceService } from 'src/app/Service/dataService/dataservice.service';
import { HttpErrorResponse } from '@angular/common/http';

 export const PICK_FORMATS = {
   parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
   display: {
       dateInput: 'input',
       monthYearLabel: {year: 'numeric', month: 'short'},
       dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
       monthYearA11yLabel: {year: 'numeric', month: 'long'}
   }
 };
 
 class PickDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
       if (displayFormat === 'input') {
           return formatDate(date,'MMM dd,yyyy',this.locale);;
       } else {
           return date.toDateString();
       }
   }
 }

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
    DatePipe
]
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
  temp:any;
  userLabels = [];
  labelName = "";
  execute = false;
  checked = false;
  noteLabel = [];
  checkedLabel :any = [];
  constructor(private noteservice:NotesService,
    private dialog:MatDialog,
    private snack:MatSnackBar, public datepipe: DatePipe
    ,private data:DataserviceService) { }
  @Input() notes!:any;
  ngOnInit(): void {
    this.getFromLocalStorage();
    this.getDate();
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
   setRemainder(notes:any){
    let date = new Date();
     date.setDate(date.getDate()+7);
    this.addRemainder= this.monthArr[date.getMonth()]+" "+date.getDate()+", 8:00AM";
    this.startDate = date;
    console.log(this.addRemainder)
    this.noteservice.setRemainder(notes['notesId'],this.addRemainder)
    .subscribe((result:any)=>{
      this.data.changeMessage(true);
      this.snack.open(result.message,'',{duration:3000});
    })
   }
   deleteRemainder(note:any){
      this.noteservice.deleteReaminder(note['notesId']).
      subscribe((result:any)=>{
        this.data.changeMessage(true);
        this.snack.open(result.message,'',{duration:3000});

      })
   }
   set(note:any){
    this.startDate = new Date();
    console.log(this.startDate)
    this.noteservice.setRemainder(note['notesId'],"Today, 8:00AM")
    .subscribe((result:any)=>{
      this.data.changeMessage(true);
      this.snack.open(result.message,'',{duration:3000});
    })
   }
   setTom(notes:any){
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate()+1); 
    this.noteservice.setRemainder(notes['notesId'],"Tommorrow, 8:00AM")
    .subscribe((result:any)=>{
      this.data.changeMessage(true);
      this.snack.open(result.message,'',{duration:3000});
    })
   }
   getDateTime(notes:any,data:any,time:any){
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
    this.noteservice.setRemainder(notes['notesId'],this.addRemainder)
    .subscribe((result:any)=>{
      this.data.changeMessage(true);
      this.snack.open(result.message,'',{duration:3000});
    })
   }
  pin(notes:any){
    console.log(notes['is_Pin'],this.pinned);
    this.pinned = notes['is_Pin'];
    notes['is_Pin'] = !this.pinned;
    this.noteservice.pin(notes.notesId).
    subscribe((result:any)=>{
      this.data.changeMessage(true);
        this.snack.open(result.message,'',{duration:3000});
    })
  }
  archive(notes:any){
    console.log(notes['is_Archive'],this.isarchive);
    this.isarchive = notes['is_Pin'];
    notes['is_Archive'] = !this.isarchive;
    this.noteservice.archive(notes.notesId).
    subscribe((result:any)=>{
      this.data.changeMessage(true);
        this.snack.open(result.message,'',{duration:3000});
    })
  }
  setColour(note:any,color:any){
    console.log(note['color']);
    note['color'] = color;
    console.log(note['color'])
    this.noteservice.updatecolor(note.notesId,color)
    .subscribe((result:any)=>{
      this.data.changeMessage(true);
      this.snack.open(result.message,'',{duration:3000})
    })
    }
    openNoteDialog(notes:any){
      let dialogref = this.dialog.open(NotesdialogComponent,{data:{notes}});
      dialogref.afterClosed().subscribe((result)=>{
        console.log(result);
       })
    }
    openDialog(notes:any){
      this.noteservice.getCollaborators(notes['notesId']).
      subscribe((result:any)=>{
        console.log(result)
        this.collaboratorArr = result.data;
        if(this.collaboratorArr ==null){
          this.collaboratorArr = [];
        }
      let dialogref = this.dialog.open(DialogComponent,{data:{name : this.Name,email:this.Email, collab: this.collaboratorArr,notesId:notes['notesId'],delete:true}});
      dialogref.afterClosed().subscribe((result)=>{
        console.log(result);
        this.collaboratorArr = result;
        this.addColab(notes['notesId'],this.collaboratorArr);
       })
      })
      
    }
    addColab(note:any,colab:any){
      for(let col of colab){
        console.log(col);
      this.noteservice.addCollab(note,col.colEmail)
      .subscribe((result:any)=>{
        this.data.changeMessage(true);
        this.snack.open(result.message,'',{duration:3000});
      })
    }
    }
    addTrash(note:any){
      this.noteservice.addTrash(note['notesId']).
      subscribe((result:any)=>{
        this.data.changeMessage(true);
        this.snack.open(result.message,'',{duration:3000});
      })

    }
    AddImage(){
      if(this.execute == true){
        return;
      }
      this.execute = true;

    }
    onFileChange(event:any){
      var files: File=event.target.files.item(0);
      console.log(event.target.files.item(0));
      const form = new FormData();
      form.append('image',files,files.name);
      console.log(form)
      this.noteservice.addImage(this.notes['notesId'],form).
      subscribe((result:any)=>{
        this.data.changeMessage(true);
        console.log(result);
        this.execute = false;
      })

    }
    removeImage(data:any){
      this.noteservice.removeImage(data).
      subscribe((result:any)=>{
        this.data.changeMessage(true);
        console.log(result);
      })
    }
    getLabels(){
      this.noteservice.getLabels().
      subscribe((result:any)=>{
          this.userLabels = result.data;
          console.log(result)
      })
    }
    addLabelToNote(data:any){
      this.noteservice.addLabelToNote(data,this.labelName).
      subscribe((result:any)=>{
        this.data.changeMessage(true);
        console.log(result);
      })
    }
    getLabelForNotes(data:any){
      this.noteservice.getLabelForNotes(data).
      subscribe((result:any)=>{
        this.noteLabel = result.data;
        if(this.noteLabel!=null){
        for(let ul of this.userLabels){
          var isMatch = false;
          for(let nl of this.noteLabel){
                if(ul['labelName'] == nl['labelName']){
                    let lebel = {
                      id : nl['labelId'],
                      labelName : nl['labelName'],
                      checked:true
                    }
                    isMatch = true;
                    this.checkedLabel.push(lebel);
                    break;
                }
          }
          if(!isMatch){
            let lebel = {
              id: ul['labelId'],
              labelName : ul['labelName'],
              checked:false
            }
            this.checkedLabel.push(lebel);
          }
        }
      }else{
        for(let ul of this.userLabels){
          let lebel = {
            id: ul['labelId'],
            labelName : ul['labelName'],
            checked:false
          }
          this.checkedLabel.push(lebel);
        }
      }
        console.log(this.checkedLabel)
      },(error: HttpErrorResponse) => {
      })

    }

    addOrRemoveLabel(check:any,noteId:any,label:any){
      if(check){
        console.log("add");
        this.noteservice.addLabelToNote(noteId,label['labelName']).
      subscribe((result:any)=>{
        this.data.changeMessage(true);
        console.log(result);
      })

      }else{
        console.log("remove");
        console.log(label['id']);
        this.noteservice.removeLabel(label['id'])
        .subscribe((result:any)=>{
          this.data.changeMessage(true);
          console.log(result);
        })
      }
    }
}


import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  colab_email:any="";
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit(): void {

  }
  changeText(event:any){
      return event.target.value;
  }
//   removeColab(colab:any){
//     console.log(colab);
//   }
 }

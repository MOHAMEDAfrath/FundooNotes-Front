import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpserviceService } from '../HttpService/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
   user = JSON.parse(localStorage.getItem('FundooUser')!);
   header:any='';
  constructor(private httpService: HttpserviceService,
    ) { }
  CreateNote(data: any,pin:boolean,archive:boolean,color:string,remainder:string) {
   
    let params = {
      Title: data.title,
      Notes: data.Desc,
      UserId: this.user.userId,
      Remainder:remainder,
      Color:color,
      Is_Archive:archive,
      Is_Pin:pin
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.post(`${environment.baseUrl}/api/addNote`, params,true,this.header);
  }
  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.user.token}
    }
  }
  getLabels(){
    let params = new HttpParams().set('userId',this.user.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/getLabel`,params,true,this.header);
  }
}


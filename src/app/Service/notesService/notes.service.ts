import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpserviceService } from '../HttpService/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
   headers = {
    headers: {Authorization: "Bearer " + this.user.token}
  }
  constructor(private httpService: HttpserviceService,
    ) { }
  CreateNote(data: any) {
    let params = {
      Title: data.title,
      Notes: data.Desc,
      UserId: this.user.userId,
    };
    console.log(this.user.token);
    return this.httpService.post(`${environment.baseUrl}/api/addNote`, params,true,this.headers);
  }
}


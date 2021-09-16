import { Injectable } from '@angular/core';
import { HttpserviceService } from '../HttpService/httpservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private httpService : HttpserviceService) { }

  Register(data:any){
      const params = {
        FirstName: data.firstName,
        LastName: data.lastName,
        EmailId : data.email,
        Password: data.password
      }
      return this.httpService.post(`${environment.baseUrl}/api/register`,params);
  }
  Login(data:any){
    const params = {
      EmailId: data.email,
      Password:data.password
    }
    return this.httpService.post(`${environment.baseUrl}/api/login`,params);
  }
}

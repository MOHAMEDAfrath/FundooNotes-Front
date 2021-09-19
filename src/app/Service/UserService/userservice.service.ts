import { Injectable } from '@angular/core';
import { HttpserviceService } from '../HttpService/httpservice.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  constructor(private httpService: HttpserviceService) {}

  Register(data: any) {
    const params = {
      FirstName: data.firstName,
      LastName: data.lastName,
      EmailId: data.email,
      Password: data.password,
    };
    return this.httpService.post(`${environment.baseUrl}/api/register`, params);
  }
  Login(data: any) {
    const params = {
      EmailId: data.email,
      Password: data.password,
    };
    return this.httpService.post(`${environment.baseUrl}/api/login`, params);
  }
  Forgot(data: any) {
    let params = new HttpParams().set('email', data.email);
    return this.httpService.post(
      `${environment.baseUrl}/api/ForgotPassword`,
      params
    );
  }
  Reset(email: string, data: any) {
    let params = {
      EmailId: email,
      Password: data.password,
    };
    return this.httpService.put(
      `${environment.baseUrl}/api/resetPassword`,
      params
    );
  }
  check(data: any) {
    let params = new HttpParams().set('token', data);
    return this.httpService.post(
      `${environment.baseUrl}/api/checkForgot`,
      params
    );
  }
  CreateNote(data: any) {
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    let params = {
      Title: data.title,
      Notes: data.Desc,
      UserId: user.userId,
    };
    return this.httpService.post(`${environment.baseUrl}/api/addNote`, params);
  }
}

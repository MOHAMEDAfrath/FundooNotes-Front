import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(
    private http : HttpClient
  ) { }
  post(url : string,data : any=null, isHeaderRequired:any = false, headers = null){
    return this.http.post(url,data,isHeaderRequired && headers)
  }
}

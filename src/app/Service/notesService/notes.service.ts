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
  checkEmail(colab:any){
    let params = new HttpParams().set('email',colab);
    return this.httpService.post(`${environment.baseUrl}/api/checkEmail`,params);
  }
  getUserNotes(){
    let params = new HttpParams().set('userId',this.user.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/getNote`,params,true,this.header);
  }
  getArchive(){
    let params = new HttpParams().set('userId',this.user.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetArchiveNotes`,params,true,this.header);
  }
  getRemainder(){
    let params = new HttpParams().set('userId',this.user.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetRemainderNotes`,params,true,this.header);
  }
  getTrash(){
    let params = new HttpParams().set('userId',this.user.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetTrashNotes`,params,true,this.header);
  }
  pin(data:any){
    let params = new HttpParams().set('notesId',data);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/Pin`,params,true,this.header);
  }
  archive(data:any){
    let params = new HttpParams().set('notesId',data);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/archive`,params,true,this.header);
  }
  updatecolor(data:any,color:any){
    let params = new HttpParams().set('noteId',data).set('color',color)
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/UpdateColor`,params,true,this.header);
  }
  addTrash(data:any){
    let params = new HttpParams().set('notesId',data);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/Trash`,params,true,this.header);
  }
  restore(data:any){
    let params = new HttpParams().set('notesId',data);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/Trash/Restore`,params,true,this.header);
  }
  deleteFromTrash(data:any){
    let params = new HttpParams().set('notesId',data);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/Trash/Delete`,params,true,this.header);
  }
  setRemainder(data:any,date:any){
    let params = new HttpParams().set('notesId',data).set('remainder',date).set('userId',this.user.userId);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/Remainder`,params,true,this.header);
  }
  deleteReaminder(data:any){
    let params = new HttpParams().set('notesId',data);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/RemainderDelete`,params,true,this.header);
  }
  getCollaborators(data:any){
    let params = new HttpParams().set('noteId',data);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/getCollaborator`,params,true,this.header);
  }
  addCollab(data:any,colab:any){
    let params = {
      NotesId: data,
      ColEmail:colab
      
    }
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/addCollaborator`,params,true,this.header);
  }
  emptyTrash(data:any){
    let params = new HttpParams().set('userId',data);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/Trash/EmptyTrash`,params,true,this.header);
  }
  addImage(data:any,form:any){
    let params = new HttpParams().set('notesId',data).set('image',form).set('userId',this.user.userId);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/addImage?notesId=${data}&userId=${this.user.userId}`,form,true,this.header);
  }
  updateNotes(id:any,data:any,pin:any,archive:any,color:any,remainder:any,image:any){
    let params = {
      NotesId:id,
      Title: data.title,
      Notes: data.Desc,
      Remainder:remainder,
      Color:color,
      Is_Archive:archive,
      Is_Pin:pin,
      image:image
    }
    return this.httpService.put(`${environment.baseUrl}/api/UpdateNote`,params,true,this.header);
  }
  getNotesByLabel(user:any,label:any){
      let params = new HttpParams().set('userId',user).set('labelName',label);
      this.getToken();
      return this.httpService.post(`${environment.baseUrl}/api/getNotesByLabel`,params,true,this.header);
  }
  deleteColab(colab:any){
        let params = new HttpParams().set('colId',colab);
        this.getToken();
        return this.httpService.post(`${environment.baseUrl}/api/deleteCollaborator`,params,true,this.header);
  }
  removeImage(data:any){
    let params = new HttpParams().set('notesId',data);
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/removeImage`,params,true,this.header);
  }
  addLabelToNote(data:any,label:any){
    let params = {
      NotesId : data,
      LabelName: label,
      UserId : this.user.userId
    }
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/AddLabelToNote`,params,true,this.header);
  }
  getLabelForNotes(data:any){
    let params = new HttpParams().set('notesId',data);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/GetLabelByNote`,params,true,this.header);
  }
  removeLabel(data:any){
    let params = new HttpParams().set('labelId',data);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/DeleteaLabelFromNote`,params,true,this.header);
  }
  addLabel(user:any,label:any){
    let params = {
      UserId:user,
      LabelName:label
    }
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/addLabel`,params,true,this.header);
    
  }
  deleteLabel(data:any){
    let params = new HttpParams().set('userId',this.user.userId).set('labelName',data);
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/delLabel`,params,true,this.header);
  }
  editLabel(data:any,label:any){
    let params = {
      UserId :this.user.userId,
      LabelId:data['labelId'],
      LabelName:label
    
    }
    this.getToken();
    return this.httpService.put(`${environment.baseUrl}/api/editLabel`,params,true,this.header);
  }
}


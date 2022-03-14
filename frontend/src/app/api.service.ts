import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   messages:any= [];
   users:any=[];
   path= environment.path;

  constructor(private http:HttpClient) { }

  getMessages(userId:Number){
    this.http.get(this.path + '/posts/' + userId).subscribe(res=>{
      this.messages= res;
    })
  }

  postMessages(message:{}){
  
    this.http.post(this.path + '/post',message).subscribe(res=>{

    });
  }

  getUsers(){
     this.http.get(this.path + '/users').subscribe(res=>{
      this.users = res;

    })
  }

  async getProfile(id:Number){
    return this.http.get(this.path + '/profile/'+id);
  
  }
  
}

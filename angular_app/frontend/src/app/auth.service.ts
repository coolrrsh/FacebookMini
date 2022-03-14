import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  path = environment.path + '/auth';
  TOKEN_KEY = 'token';

  get isAuthenticated(){
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
  }

  //
 

  registerUser(registerData:any){
    this.http.post<any>(this.path +'/register',registerData).subscribe(res=>{
      this.saveToken(res);
      
    })
  }
  loginUser(loginData:any){
    this.http.post<any>(this.path+'/login',loginData).subscribe(res=>{
    this.saveToken(res);
    })
  }

  saveToken(res:any){
    localStorage.setItem(this.TOKEN_KEY,res.token);
  }
}

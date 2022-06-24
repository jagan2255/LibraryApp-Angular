import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  adduser(data:any){
    return this.http.post('http://localhost:3000/adduser' , {data:data})
  }

  loginuser(data:any){
    return this.http.post<any>('http://localhost:3000/login' , {data:data})
  }

  logedIn(){
    return !!localStorage.getItem("token")
  }

  gettoken(){
    return localStorage.getItem("token")
  }
  
}





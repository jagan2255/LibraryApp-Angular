import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  getbooks(){
    return this.http.get("http://localhost:3000/books")
  }


  addbook(data:any){
    return this.http.post('http://localhost:3000/add' , {data:data})
  }

  deletedata(id:any){
    return  this.http.delete("http://localhost:3000/delete/"+id)
  
  }
  getbookdata(id:any){
    return  this.http.get('http://localhost:3000/'+id)
  
  }
  
  updatebook(data:any){
    return  this.http.put('http://localhost:3000/update' , data)
    
  }
  

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books=[{

    code:"",
    bookname:"",
    author:"",
    edition:"",
    rating:"",
    imageurl:"",

  }]

  constructor(private bookservice:BookService , private route:Router , public user:UserService) { }

  ngOnInit(): void {
    this.bookservice.getbooks()
    .subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data))
    })
  }


  deletedata(item:any){
    if(confirm(`Are you sure Want to delete ${item.bookname}`)){
    this.bookservice.deletedata(item._id)
    .subscribe((data)=>{
      this.books=this.books.filter(p=>p!==item)
    })
    }
      
  }


  update(item:any){

    localStorage.setItem("Bookdata" , item._id.toString())
    this.route.navigate(["update"])

  }




}

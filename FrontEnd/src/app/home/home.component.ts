import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books=[{

    code:"",
    bookname:"",
    author:"",
    edition:"",
    rating:"",
    imageurl:"",

  }]

  constructor(private bookservice:BookService , public user:UserService , private route:Router) { }

  ngOnInit(): void {
    this.bookservice.getbooks().subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data))
    })
  }

  viewbook(item:any){
    localStorage.setItem("bookdata" , item._id.toString())
    this.route.navigate(["bookview"])

  }

}

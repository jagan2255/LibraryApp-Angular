import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  constructor(private bookservice:BookService , private route:Router) { }

  books={

    code:"",
    bookname:"",
    author:"",
    edition:"",
    rating:"",
    imageurl:"",
    description:""

  }

  ngOnInit(): void {
  }

  addbook(){
        this.bookservice.addbook(this.books)
        .subscribe((data)=>{
          console.log(data);
          
        })
        this.route.navigate(['/books'])
  }

}

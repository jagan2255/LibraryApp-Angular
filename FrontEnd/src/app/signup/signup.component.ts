import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userservice:UserService , private route:Router) { }
   
  user={
    username:"",
    email:"",
    phonenumber:"",
    password:"",
    confpass:""
  }

  ngOnInit(): void {
  }

  signup(){
    this.userservice.adduser(this.user).subscribe((data)=>{console.log(data)})
    this.route.navigate(['/login'])
  }



}

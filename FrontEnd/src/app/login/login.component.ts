import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={
    username:"",
    password:""
  }

  constructor(private userservice:UserService , private route:Router) { }

  ngOnInit(): void {

  }


  loginuser(){
    this.userservice.loginuser(this.user).subscribe((res)=>{
     if(res.status){
      localStorage.setItem('token' , res.token)
      this.route.navigate(['books'])
     }else{
      alert("Username or Password is incorrect")
      window.location.reload();

     }
      
    })
  }
}



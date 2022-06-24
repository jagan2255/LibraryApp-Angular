import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private user:UserService , private route:Router){}

  canActivate():boolean{

    if(this.user.logedIn()){
      return true
    }else{
      this.route.navigate([''])
      return false
    }
  }
  
}
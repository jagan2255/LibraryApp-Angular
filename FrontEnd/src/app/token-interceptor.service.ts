import { Injectable , Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req:any,nxt:any){

    let userService = this.injector.get(UserService)
    let tokenizedreq = req.clone(
      {
        setHeaders:{
          Authorization:`Bearer ${userService.gettoken()}`
        }
      }
    )
    return nxt.handle(tokenizedreq)
  }
}

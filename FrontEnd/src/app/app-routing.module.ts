import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './addbook/addbook.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from './auth.guard';
import { BookviewComponent } from './bookview/bookview.component';

const routes: Routes = [
  {path:"" , component:HomeComponent},
  {path:"books" , component:BooksComponent},
  {path:"addbook" , canActivate:[AuthGuard] , component:AddbookComponent},
  {path:"update" , component:UpdateComponent},
  {path:"login" , component:LoginComponent},
  {path:"signup" , component:SignupComponent},
  {path:"bookview" , component:BookviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

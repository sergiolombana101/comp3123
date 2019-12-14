import { Injectable } from '@angular/core';
import { Admin } from '../../models/Admin';
import { Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'https://lobby-fullstack.herokuapp.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  error:any;
  result:any;


  constructor(
    private http: HttpClient,
    public router:Router
  ) { }


  signIn(admin:Admin){
      return this.http.post<any>("/api/auth", admin)
        .pipe(map(result=>
            this.result = result["data"]//console.log("Result data is: "+JSON.stringify(result["data"]))
        ))
  }
       
  getToken(){
    //GET TOKEN STORED IN THE LOCAL STORAGE
    return localStorage.getItem('acess_token');
  }
  get isLoggedIn():boolean{
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null)?true:false;
  }
  doLogout(){
    let removeToken = localStorage.removeItem('access_token');
    if(removeToken == null){
      this.router.navigate(['log-in']); //RETURN TO LOGIN PAGE
    }
  }
  getUserProfile(email):Observable<any>{
    let api = `${this.endpoint}/dashboard`;
    return this.http.get(api, {headers:this.headers}).pipe(
      map((res: Response)=>{
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
   //ERROR
   handleError(error:HttpErrorResponse){
    let msg = '';
    if(error.error instanceof ErrorEvent){
      // CLIENT SIDE ERROR
      msg = error.error.message;
    }else{
      //SERVER SIDE ERROR
      msg = `Error Code: ${error.status}\nMessage:${error.message}`;
    }
    return throwError(msg);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../../../backend/services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError, map} from 'rxjs/operators';
import { Admin } from 'src/app/backend/models/Admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  admin:any;
  error: any;

  constructor(
    public fb:FormBuilder,
    public authService:AuthService,
    public router: Router
  ) { 
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  ngOnInit() {
  }

  login(){
    let invalidEmail = false;
    let invalidPassword = false;
    if(this.loginForm.value.email == ""){
      invalidEmail = true;
    }
    if(this.loginForm.value.password == ""){
      invalidPassword = true;
    }
    if(invalidEmail || invalidPassword){
      if(invalidEmail&&invalidPassword){
        this.error = "Please enter a valid email and password";
      }
      else if(invalidEmail && !invalidPassword){
        this.error = "Please enter a valid Email"
      }else if(invalidPassword && !invalidEmail){
        this.error = "Please enter a valid password"
      }
    }
    else{
    this.authService.signIn(this.loginForm.value)
    .subscribe(res=> {
      if(res.message == "Authentication successful"){
        localStorage.setItem("User", res.email)
        this.router.navigate(['dashboard'])
      }
      else{
        this.error = "";
        this.error = res.message
        this.router.navigate(['login'])
      }
      }
    )
    }


    
  }

}

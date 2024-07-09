import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
 
  loginDetails:Login={
    Username:"",
    Password:""
   
   }
   
   constructor(private route:ActivatedRoute,private loginAuth:AuthService,private router:Router){}
 
  ngOnInit(): void {}
 
  loginForm=new FormGroup({
    username:new FormControl('',
    [
     // Validators.required,Validators.email
    ]),
    password:new FormControl('',
    [
      // Validators.required,
      // Validators.minLength(6),
      // Validators.maxLength(15)
    ]),
    // role:new FormControl("",[ Validators.required])
 
  });
  get Username():FormControl{
    return this.loginForm.get("username") as FormControl;
  }
  get Password():FormControl{
    return this.loginForm.get("password") as FormControl;
  }
  isUserValid:boolean=false;
  login()
  {
    console.log(this.loginDetails);
    this.loginAuth.loginUser(this.loginDetails)
    .subscribe((res:any)=>{
      console.log(res.JWTToken);
      if(res.JWTToken==null)
      {
        console.log(res);
        this.isUserValid=false;
        console.log(res.Message);
      }
      else{
        console.log(res);
        this.isUserValid=true;
        this.loginAuth.setToken(res.JWTToken);
       alert(res.Message);
        this.router.navigateByUrl('dashboard');
      }
    })
 
   
  }
 
}
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from '../models/register';
import { Login } from '../models/login';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  currentUser: BehaviorSubject<any>=new BehaviorSubject(null); //to decrypt jwt token
  baseApiUrl:string="https://localhost:7050";
  jwtHelperService=new JwtHelperService();
 
  constructor(private http:HttpClient,private router:Router) { }
 
  // errorCheck(res:any)
  // {
  //   if(res instanceof HttpErrorResponse)
  //       {
  //         if(res.error){
  //           if(Array.isArray(res.error))
  //           {
  //             res.error.forEach((e,i)=>{
  //               // this.errorCaptured+=e;
  //             });
  //           }else if(typeof res.error==='object'){
  //             const errorMessage=Object.values(res.error["errors"]).flat();
  //             // this.errorCaptured=JSON.stringify(res.error["errors"],null,2);
  //             errorMessage.forEach(m=>alert(m));
  //           }else{
  //             // this.errorCaptured+=res.error;
  //           }
  //         }
  //       }
  // }
 
  registerUser(user:Register){
    return this.http.post(this.baseApiUrl+"/api/Auth/register",user);
  }
 
  loginUser(loginInfo:Login)
  {
    return this.http.post(this.baseApiUrl+"/api/Auth/login",loginInfo);
  }
  setToken(token:string){
    localStorage.setItem("access_token",token);
    this.loadCurrentUser();
  }
 
  loadCurrentUser(){
    const token=localStorage.getItem("access_token");
    const userInfo=token != null ? this.jwtHelperService.decodeToken(token) : null ;
    const data=userInfo?{
      UserName : userInfo.UserName ,
      Name: userInfo.Name,
      Password: userInfo.Password,
      Role: userInfo.Role
      // UserId:userInfo.UserId
 
    } :null;
    this.currentUser.next(data);
    console.log(data);
  }
 
  isLoggedIn():boolean{
    const token= localStorage.getItem("access_token");
    console.log(this.jwtHelperService.isTokenExpired(token));
    if(this.jwtHelperService.isTokenExpired(token))
    {
      alert("Login again to continue");
      this.router.navigateByUrl('login');
      this.removeToken();
     
    }
     
    return !!token && !this.jwtHelperService.isTokenExpired(token);
  }
 
  removeToken(){
    localStorage.removeItem("access_token");
  }
 
}
 
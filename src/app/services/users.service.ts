import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  baseApiUrl : string = 'https://localhost:7050';

  GetUsers():Observable<any>{
    return this.http.get<any>(this.baseApiUrl + '/api/Users');
  }

  GetUserByGroup(groupId:number):Observable<any>{
    return this.http.get<any>(this.baseApiUrl + '/api/Users/GroupId?groupId=' + groupId);
  }

   
  GetUserById(id:number):Observable<any>{
    return this.http.get<any>(this.baseApiUrl + '/api/Users/GetUserById/' + id);
  }
  GetUserByIds(userIds:number[]):Observable<any>{
    let params=new HttpParams();
    userIds.forEach(id=>{
      params=params.append('userIds',id.toString());
 
    });
    return this.http.get<any>(`${this.baseApiUrl}/api/Users/UserId`,{params});
  }
  //https://localhost:7050/api/Users/UserId?userIds=1&userIds=53


  CreateUserAsync(users:Users):Observable<Users>{
    return this.http.post<Users>(this.baseApiUrl+ '/api/Users',users);
  }
}

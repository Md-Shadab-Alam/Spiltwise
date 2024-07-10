import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  baseApiUrl: string = 'https://localhost:7050';

  GetExpenseAsync():Observable<any>{
    return this.http.get<any>(this.baseApiUrl+ '/api/Expense');
  }

  GetExpenseByGroup(groupId : number):Observable<any>{
    return this.http.get<any>(this.baseApiUrl+ '/api/Expense/GroupId?groupid=' +groupId);
  }

  // AddExpense(expense : Expense, selectedUsersId : number[], userPaidId : number[]){
  //   const url = `${this.baseApiUrl}/api/Expense`;
  //   const params = new HttpParams()
  //   .set('selectedUsersId',selectedUsersId.join(','))
  //   .set('userPaidId',userPaidId.toString());
  //   return this.http.post<Expense>(url, expense,{params});
  // }
  AddExpense(expense : any, selectedUsersId : number[], userPaidId : number):Observable<any>{
    // return this.http.post<any>(`${this.baseApiUrl}/api/Expense/AddExpense?`, expense,{
    //   params:{
    //     selectedUsersId:selectedUsersId.join('&'),
    //     userPaidId:userPaidId.toString()
    //   }
    // });
    let params=new HttpParams();
    selectedUsersId.forEach(id=>{
      params=params.append('selectedUsersId',id.toString());
    });
    params=params.append('userPaidId',userPaidId.toString());
 
    return this.http.post(this.baseApiUrl+"/api/Expense?",expense,{params});
  }

}
//https://localhost:7050/api/Expense?selectedUsersId=53&selectedUsersId=54&userPaidId=53
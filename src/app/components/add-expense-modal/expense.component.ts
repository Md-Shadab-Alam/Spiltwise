import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ExpenseDetail } from '../../models/expense-detail';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expense: Expense[] = [];
  groupId: number = 0;
  member: any = "";
  addExpenseForm: FormGroup;
  selectedMembers: any[] = [];
  selectedMembersId: number[] = [];
  usersList: any[] = [];

  // addExpenseForm = new FormGroup({
  //   expTitle: new FormControl(''),
  //   expDesc: new FormControl(''),
  //   amount: new FormControl(''),
  //   paidBy : new FormControl(''),
  //   splitAmong : new FormControl('')

  // })
  constructor(private expenseService: ExpenseService, private usersService: UsersService, private fb: FormBuilder) {
    this.addExpenseForm = this.fb.group({
      groupName:[''],
        //expDesc: [''],
        groupId:[0],
        expenseDetails:this.fb.group({
          amount:0,
          description:[''],
          title:['']
        }),
        paidBy : [''],
        members:this.fb.array([])
    })
  }

  getMembers(): FormArray {
    return this.addExpenseForm.get('members') as FormArray;
  }

  // addExpenseDetailRequest: ExpenseDetail = {
  //   id: 0,
  //   expenseId: 0,
  //   title: '',
  //   amount: 0,
  //   description: '',
  //   createdOn: new Date
  // }


  // addExpenseRequest: Expense = {
  //   expenseId: 0,
  //   //groupName: "",
  //   groupId: 0,
  //   usersPaid: [],
  //   usersInvolved: [],
  //   expenseDetails: this.addExpenseDetailRequest
  // }

  // addExpenseRequest : Expense = {
  //   expenseId: 0,
  //   groupId: 0,
  //   usersPaid: [],
  //   usersInvolved: [],
  //   expenseDetails: this.addExpenseDetailRequest
  // }


  onPaidByChange(event: any) {
    this.addExpenseForm.get('paidBy')?.setValue(event.target.value);
  }


  ngOnInit(): void {

    this.usersService.GetUsers()
      .subscribe({
        next: (response) => {
          console.log(response);
          this.usersList = response.data;
        },
        error: (response) => {
          console.log(response)
        }
      })


  }
  onChechboxChange(e: any) {
    const members: FormArray = this.addExpenseForm.get('members') as FormArray;
    if (e.target.checked) {
      //find user object by Id
      const user = this.usersList.find(user => user.usersId == e.target.value);
      //Add to FormArray
      members.push(new FormControl(user));
      //Add to selectedMembers array
      this.selectedMembers.push(user);
      this.selectedMembersId.push(user.usersId);
    }else{
      //Remove from FromArray
      const index=members.controls.findIndex(x=>x.value.usersId===e.target.value);
      members.removeAt(index);
      //Remove from selectedMembers array
      const selectedIndex=this.selectedMembers.findIndex(user=>user.usersId==e.target.value);
      //const selectedIndexId=this.selectedMembersId.findIndex()
      if(selectedIndex>-1)
      {
        this.selectedMembers.splice(selectedIndex,1);
        this.selectedMembersId.splice(selectedIndex,1);
        //this.selectedMembersId.splice(selectedIndex,-1);
      }
    }
 
    console.log(this.selectedMembers);
    console.log(this.selectedMembersId);
  }


  addExpense() {
    console.log("addExpense running");
    console.log(this.selectedMembersId);

    //const selectedMembersId=this.addExpenseForm.value.members;
    const userPaidId = this.addExpenseForm.value.paidBy;
    const expenseData = this.addExpenseForm.value;
    const selectedUserIds = this.selectedMembersId;

    this.usersService.GetUserByIds([...selectedUserIds, userPaidId]).subscribe(
      response => {
        const users = response.data;
        console.log(users);
        const usersInvolved = users.filter((user: { usersId: number; }) => selectedUserIds.includes(user.usersId));
        const usersPaid = users.filter((user: { usersId: number; }) => user.usersId === userPaidId);

        const expense = {
          ...expenseData,
          UsersInvolved: usersInvolved,
          UsersPaid: usersPaid
        }

        console.log(expense);

        this.expenseService.AddExpense(expense, selectedUserIds,userPaidId)
          .subscribe(response => {
            console.log('Expense added successfully',response);
          },
          error=>{
            console.error('Error adding expense',error);
          }
          );
      }
    );
}

}

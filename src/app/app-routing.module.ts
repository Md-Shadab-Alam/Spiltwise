import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateGroupComponent } from './components/create-group-modal/create-group.component';
import { GroupComponent } from './components/group/group.component';
import { ExpenseComponent } from './components/add-expense-modal/expense.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  {path:"",component:HomeComponent , canActivate:[OktaAuthGuard]},
  {path:"dashboard", component:DashboardComponent , canActivate:[OktaAuthGuard]},
  {path:"Createform", component:CreateGroupComponent},
  {path:"group", component:GroupComponent},
  {path:"group/:groupId", component:GroupComponent},
  {path:"expense",component:ExpenseComponent},
  {path:"login/callback", component: OktaCallbackComponent},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

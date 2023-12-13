import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './AuthGuard';
import { FamilyRegisterComponent } from './components/family-register/family-register.component';
import { CreateFamilyComponent } from './components/create-family/create-family.component';
import { MemberComponent } from './components/member/member.component';
import { CreateMemberComponent } from './components/create-member/create-member.component';
import { CashComponent } from './components/accounts/cash/cash.component';
import { CreateTypeComponent } from './components/accounts/create-type/create-type.component';
import { AccountTypeComponent } from './components/accounts/account-type/account-type.component';
import { InsertCashComponent } from './components/accounts/insert-cash/insert-cash.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: 'full'},
  { path: "dashboard", component: DashboardComponent , canActivate: [AuthGuard]},
  { path: "register", component: RegisterComponent},
  { path: "login", component: LoginComponent},
  { path: "logout", component: LogoutComponent},
  { path: "user-list", component: UserListComponent},
  { path: "user-profile", component: UserProfileComponent},
  { path: "family-register", component: FamilyRegisterComponent},
  { path: "create-family", component: CreateFamilyComponent},
  { path: "members", component: MemberComponent},
  { path: "create-member", component: CreateMemberComponent},
  { path: "create-cash", component: InsertCashComponent},
  { path: "account-type", component: AccountTypeComponent},
  { path: "create-type", component: CreateTypeComponent},
  { path: "cash", component: CashComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

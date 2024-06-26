import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UserReducer } from './state/uesr.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import { AuthGuard } from './AuthGuard';
import { FamilyRegisterComponent } from './components/family/family-register/family-register.component';
import { CreateFamilyComponent } from './components/family/create-family/create-family.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { MemberComponent } from './components/family/member/member.component';
import { CreateMemberComponent } from './components/family/create-member/create-member.component';
import { CreateTypeComponent } from './components/accounts/create-type/create-type.component';
import { AccountTypeComponent } from './components/accounts/account-type/account-type.component';
import { CashComponent } from './components/accounts/cash/cash.component';
import { InsertCashComponent } from './components/accounts/insert-cash/insert-cash.component';
import { AuthInterceptor } from './service/auth-interceptor.interceptor';
import { FamilyDetailedComponent } from './components/family/family-detailed/family-detailed.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AccountsDashboardComponent } from './components/accounts/accounts-dashboard/accounts-dashboard.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    NavbarComponent,
    UserListComponent,
    UserProfileComponent,
    FamilyRegisterComponent,
    CreateFamilyComponent,
    DeleteConfirmationComponent,
    MemberComponent,
    CreateMemberComponent,
    CreateTypeComponent,
    AccountTypeComponent,
    CashComponent,
    InsertCashComponent,
    FamilyDetailedComponent,
    AccountsDashboardComponent,
    PaginationComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({user:UserReducer}),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({maxAge:50, logOnly: !isDevMode()})
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './features/bibliothecaire/dashboard/dashboard.component';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { UserManagementComponent } from './features/admin/user-management/user-management.component';


  
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: 'biblio', component: DashboardComponent },
  { path: 'books', component: BookListComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
  {path: 'users-management',component: UserManagementComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
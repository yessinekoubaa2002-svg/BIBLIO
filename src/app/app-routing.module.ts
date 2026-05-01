import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/bibliothecaire/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { BookListComponent } from './features/books/book-list/book-list.component';


const routes = [
  { path: '', component: LoginComponent },
  { path: 'biblio', component: DashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'books', component: BookListComponent }  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

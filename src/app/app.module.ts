import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ================= FEATURES =================
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './features/bibliothecaire/dashboard/dashboard.component';

import { BookListComponent } from './features/books/book-list/book-list.component';
import { BookDetailComponent } from './features/books/book-detail/book-detail.component';

import { UserManagementComponent } from './features/admin/user-management/user-management.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';

import { CreateUserComponent } from './features/admin/create-user/create-user.component';
import { CreateBibComponent } from './features/admin/create-bib/create-bib.component';
import { BibliothecaireManagementComponent } from './features/admin/bibliothecaire-management/bibliothecaire-management.component';
import { CategoryManagementComponent } from './features/admin/category-management/category-management.component';
import { CategoryCategoryComponent } from './features/admin/create-category/create-category.component';
import { CreateLivreComponent } from './features/admin/create-livre/create-livre.component';
import { BookManagementComponent } from './features/admin/book-management/book-management.component';

// ================= HTTP / FORMS =================
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ================= INTERCEPTOR =================
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

// ================= PRIME NG (IMPORTANT FIX) =================
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppLayoutComponent } from './layout/app.layout.component';
import { SidebarModule } from 'primeng/sidebar';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MyLoansComponent } from './features/user/my-loans/my-loans.component';


@NgModule({
  declarations: [
    AppComponent,

    // Auth
    LoginComponent,
    RegisterComponent,

    // Dashboards
    AdminDashboardComponent,
    UserDashboardComponent,
    DashboardComponent,

    // Books
    BookListComponent,
    BookDetailComponent,

    // Admin
    UserManagementComponent,
    UserFormComponent,
    CreateUserComponent,
    CreateBibComponent,
    BibliothecaireManagementComponent,
    CategoryManagementComponent,
    CategoryCategoryComponent,
    CreateLivreComponent,
    BookManagementComponent,
    AppLayoutComponent,
    MyLoansComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // ================= PRIME NG MODULES =================
    CardModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    SidebarModule,
    ChartModule,
    TableModule,
    TagModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
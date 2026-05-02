import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// features
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './features/bibliothecaire/dashboard/dashboard.component';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { BookDetailComponent } from './features/books/book-detail/book-detail.component';
import { UserManagementComponent } from './features/admin/user-management/user-management.component';

// ✅ shared components — must be declared HERE so FormsModule reaches them
import { UserFormComponent } from './shared/components/user-form/user-form.component';

// HTTP + Forms
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// interceptor
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { CreateUserComponent } from './features/admin/create-user/create-user.component';
import { CreateBibComponent } from './features/admin/create-bib/create-bib.component';
import { BibliothecaireManagementComponent } from './features/admin/bibliothecaire-management/bibliothecaire-management.component';
import { CategoryManagementComponent } from './features/admin/category-management/category-management.component';
import { CategoryCategoryComponent } from './features/admin/create-category/create-category.component';
import { CreateLivreComponent } from './features/admin/create-livre/create-livre.component';
import { BookManagementComponent } from './features/admin/book-management/book-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    DashboardComponent,
    BookListComponent,
    BookDetailComponent,
    UserManagementComponent,
    UserFormComponent,
    CreateUserComponent,
    CreateBibComponent,
    BibliothecaireManagementComponent,
    CategoryManagementComponent,
    CategoryCategoryComponent,
    CreateLivreComponent,
    BookManagementComponent,       // ✅ added — was missing, caused ngModel errors
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule              // ✅ already here — now reaches UserFormComponent too
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
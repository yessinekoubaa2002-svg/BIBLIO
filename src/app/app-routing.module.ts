import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './features/admin/user-management/user-management.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { BibliothecaireManagementComponent } from './features/admin/bibliothecaire-management/bibliothecaire-management.component';
import { CreateUserComponent } from './features/admin/create-user/create-user.component';
import { CreateBibComponent } from './features/admin/create-bib/create-bib.component';
import { CreateLivreComponent } from './features/admin/create-livre/create-livre.component';
import { CategoryManagementComponent } from './features/admin/category-management/category-management.component';
import { CategoryCategoryComponent } from './features/admin/create-category/create-category.component';

import { UserDashboardComponent } from './features/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './features/bibliothecaire/dashboard/dashboard.component';
import { BookListComponent } from './features/books/book-list/book-list.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { BookManagementComponent } from './features/admin/book-management/book-management.component';

const routes: Routes = [

  // AUTH
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ── ADMIN ───────────────────────────────
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' },
    children: [

      { path: '', component: AdminDashboardComponent },

      // users
      { path: 'users', component: UserManagementComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/create', component: CreateUserComponent },
      { path: 'users/edit/:id', component: CreateUserComponent },

      // bibliothecaires
      { path: 'bibliothecaires', component: BibliothecaireManagementComponent },
      { path: 'bibliothecaires/create', component: CreateBibComponent },
      { path: 'bibliothecaires/edit/:id', component: CreateBibComponent },

      // livres
      { path: 'livres', component: BookManagementComponent },
      { path: 'livres/create', component: CreateLivreComponent },
      { path: 'livres/edit/:id', component: CreateLivreComponent },

      // categories
      { path: 'categories', component: CategoryManagementComponent },
      { path: 'categories/create', component: CategoryCategoryComponent },
      { path: 'categories/edit/:id', component: CategoryCategoryComponent }
    ]
  },

  // ── BIBLIOTHECAIRE ───────────────────────
  {
    path: 'biblio',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'BIBLIOTHECAIRE' }
  },

  // ── USER ────────────────────────────────
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'USER' }
  },

  // ── BOOKS (public with auth) ─────────────
  {
    path: 'books',
    component: BookListComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
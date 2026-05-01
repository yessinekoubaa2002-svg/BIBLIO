import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './features/bibliothecaire/dashboard/dashboard.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'USER' }
  },
  {
    path: 'biblio',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'BIBLIOTHECAIRE' }
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
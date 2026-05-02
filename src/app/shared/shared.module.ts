import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserManagementComponentComponent } from './components/user-management-component/user-management-component.component';
import { UserFormComponent } from './components/user-form/user-form.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    UserManagementComponentComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

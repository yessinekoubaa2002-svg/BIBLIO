import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];

  form: any = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: ''
  };

  role = 'USER';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });
  }

  create() {
    if (this.role === 'USER') {
      this.userService.createUser(this.form).subscribe(() => {
        this.loadUsers();
      });
    } else {
      this.userService.createBibliothecaire(this.form).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
  this.userService.getAll().subscribe({
    next: (data: any) => {
      this.users = data.filter((u: any) => u.role === 'USER'); // ← add this filter
    },
    error: (err) => console.error('ERROR loading users', err)
  });
}

  deleteUser(id: number) {
    this.userService.delete(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error(err)
    });
  }
}
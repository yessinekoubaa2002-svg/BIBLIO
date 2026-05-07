import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent {

  user = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    role: 'USER'
  };

  loading = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  createUser() {
    this.loading = true;
    this.errorMessage = '';

    this.userService.createUser(this.user).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Create user error:', err);

        // useful message for UI
        this.errorMessage =
          err.status === 0
            ? 'Backend is not reachable (check http://localhost:8081)'
            : 'Failed to create user';
      }
    });
  }
}
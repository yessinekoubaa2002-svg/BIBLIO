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

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  createUser() {
  this.userService.createUser(this.user).subscribe({
    next: () => {
      this.router.navigate(['/admin/users']); // ← already correct, just confirm this is there
    },
    error: (err) => console.error(err)
  });
}
}
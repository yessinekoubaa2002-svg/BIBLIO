import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit-user.component.html'
})
export class UserEditComponent implements OnInit {

  user: any = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    role: 'USER'
  };

  userId!: number;
  loading = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser() {
    this.userService.getById(this.userId).subscribe({
      next: (data) => {
        this.user = {
          nom:        data.nom,
          prenom:     data.prenom,
          email:      data.email,
          telephone:  data.telephone,
          motDePasse: '',        // never pre-fill password
          role:       data.role
        };
      },
      error: (err) => {
        console.error('Failed to load user', err);
        this.errorMsg = 'User not found.';
      }
    });
  }

  updateUser() {
    this.loading = true;
    this.userService.update(this.userId, this.user).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.errorMsg = 'Update failed. Please try again.';
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/admin/users']);
  }
}
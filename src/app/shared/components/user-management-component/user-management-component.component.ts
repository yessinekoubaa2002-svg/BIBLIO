import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];
  filtered: any[] = [];
  searchTerm = '';
  selectedRole = '';
  loading = false;
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.filtered = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // ── SEARCH + FILTER ─────────────────────────────────
  applyFilter() {
    this.filtered = this.users.filter(u => {
      const matchSearch =
        !this.searchTerm ||
        u.nom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.prenom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchRole =
        !this.selectedRole || u.role === this.selectedRole;

      return matchSearch && matchRole;
    });
  }

  // ── NAVIGATE ─────────────────────────────────────────
  addUser() {
    this.router.navigate(['/admin/users/new']);
  }

  editUser(id: number) {
    this.router.navigate(['/admin/users/edit', id]);
  }

  // ── DELETE ───────────────────────────────────────────
  deleteUser(id: number, name: string) {
    if (!confirm(`Supprimer ${name} ? Cette action est irréversible.`)) return;
    this.userService.delete(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Delete error', err)
    });
  }

  // ── TOGGLE ENABLE/DISABLE ────────────────────────────
  // toggleStatus(id: number) {
  //   this.userService.(id).subscribe({
  //     next: () => this.loadUsers(),
  //     error: (err) => console.error('Toggle error', err)
  //   });
  // }

  // ── BADGE COLOR ──────────────────────────────────────
  roleBadge(role: string): string {
    switch (role) {
      case 'ADMIN':          return 'bg-danger';
      case 'BIBLIOTHECAIRE': return 'bg-info text-dark';
      case 'USER':           return 'bg-success';
      default:               return 'bg-secondary';
    }
  }
}
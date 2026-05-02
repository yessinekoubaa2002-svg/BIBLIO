import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bibliothecaire-management',
  templateUrl: './bibliothecaire-management.component.html'
})
export class BibliothecaireManagementComponent implements OnInit {

  bibliothecaires: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.userService.getAll().subscribe({
      next: (data: any) => {
        this.bibliothecaires = data.filter((u: any) => u.role === 'BIBLIOTHECAIRE');
      },
      error: (err) => console.error(err)
    });
  }

  delete(id: number) {
    this.userService.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  goCreate() {
    this.router.navigate(['/admin/bibliothecaires/create']);
  }
}
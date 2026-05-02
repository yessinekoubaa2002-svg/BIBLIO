import { Component, OnInit } from '@angular/core';
import { LivreService } from '../../../core/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html'
})
export class BookManagementComponent implements OnInit {

  livres: any[] = [];

  constructor(
    private livreService: LivreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.livreService.getAll().subscribe({
      next: (data) => this.livres = data,
      error: (err) => console.error(err)
    });
  }

  delete(id: number): void {
    this.livreService.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  goCreate(): void {
    this.router.navigate(['/admin/livres/create']);
  }

  goEdit(id: number): void {
    this.router.navigate(['/admin/livres/edit', id]);
  }
}
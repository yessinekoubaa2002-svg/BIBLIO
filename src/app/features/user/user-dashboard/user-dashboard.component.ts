import { Component, OnInit } from '@angular/core';
import { LivreService } from '../../../core/services/book.service';
import { EmpruntService } from '../../../core/services/emprunt.service';
import { CategoryService } from '../../../core/services/categorie.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html'
})
export class UserDashboardComponent implements OnInit {

  books: any[] = [];
  categories: any[] = [];

  searchText = '';
  authorText = '';
  categoryText = '';

  constructor(
    private livreService: LivreService,
    private empruntService: EmpruntService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  // ================= BOOKS =================

  loadBooks(): void {
    this.livreService.getAll().subscribe({
      next: (data: any[]) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  searchByTitle(): void {
    if (!this.searchText.trim()) {
      this.loadBooks();
      return;
    }

    this.livreService.searchByTitle(this.searchText).subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  searchByAuthor(): void {
    if (!this.authorText.trim()) {
      this.loadBooks();
      return;
    }

    this.livreService.searchByAuteur(this.authorText).subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  filterByCategory(): void {
    if (!this.categoryText) {
      this.loadBooks();
      return;
    }

    this.livreService.filterByCategory(this.categoryText).subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  filterAvailable(): void {
    this.livreService.getAvailable().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  filterLowStock(): void {
    this.livreService.getLowStock().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  resetFilters(): void {
    this.searchText = '';
    this.authorText = '';
    this.categoryText = '';
    this.loadBooks();
  }

  // ================= CATEGORIES =================

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data: any[]) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  // ================= BORROW =================

  borrow(livreId: number): void {
    this.empruntService.create(livreId).subscribe({
      next: () => {
        alert('Book borrowed successfully!');
        this.loadBooks();
      },
      error: (err) => console.error(err)
    });
  }
}
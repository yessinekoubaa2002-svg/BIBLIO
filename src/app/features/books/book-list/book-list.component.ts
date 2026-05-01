import { Component, OnInit } from '@angular/core';
import { LivreService } from 'src/app/core/services/book.service';
import { EmpruntService } from 'src/app/core/services/emprunt.service';
import { Livre } from 'src/app/models/Livre';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Livre[] = [];

  searchText: string = '';
  authorText: string = '';

  loading: boolean = false;

  constructor(
    private livreService: LivreService,
    private empruntService: EmpruntService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // ================= LOAD ALL =================
  loadBooks() {
    this.loading = true;

    this.livreService.getAll().subscribe({
      next: (res) => {
        this.books = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // ================= SEARCH TITLE =================
  searchByTitle() {
    if (!this.searchText.trim()) {
      return this.loadBooks();
    }

    this.loading = true;

    this.livreService.searchByTitle(this.searchText).subscribe({
      next: (res) => {
        this.books = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // ================= SEARCH AUTHOR =================
  searchByAuthor() {
    if (!this.authorText.trim()) {
      return this.loadBooks();
    }

    this.loading = true;

    this.livreService.searchByAuteur(this.authorText).subscribe({
      next: (res) => {
        this.books = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // ================= FILTER AVAILABLE =================
  filterAvailable() {
    this.loading = true;

    this.livreService.getAvailable().subscribe({
      next: (res) => {
        this.books = res;
        this.loading = false;
      },
      error: (err) => this.loading = false
    });
  }

  // ================= FILTER LOW STOCK =================
  filterLowStock() {
    this.loading = true;

    this.livreService.getLowStock().subscribe({
      next: (res) => {
        this.books = res;
        this.loading = false;
      },
      error: (err) => this.loading = false
    });
  }

  // ================= RESET =================
  resetFilters() {
    this.searchText = '';
    this.authorText = '';
    this.loadBooks();
  }

  // ================= BORROW =================
  borrow(livreId: number) {
    this.empruntService.create(livreId).subscribe({
      next: () => {

        const book = this.books.find(b => b.id === livreId);

        if (book && book.quantite > 0) {
          book.quantite--;
          book.disponible = book.quantite > 0;
        }

      },
      error: (err) => console.error(err)
    });
  }
  categoryText: string = '';

filterByCategory() {
  this.livreService.filterByCategory(this.categoryText).subscribe({
    next: (res) => this.books = res
  });
}
}
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { EmpruntService } from 'src/app/core/services/emprunt.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

books = [
  {
    id: 1,
    titre: "Java Programming",
    auteur: "John Doe",
    stock: 5
  },
  {
    id: 2,
    titre: "Spring Boot",
    auteur: "Ahmed",
    stock: 0
  }
];
  constructor(
    private bookService: BookService,
    private empruntService: EmpruntService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(){
    this.bookService.getAll().subscribe(res => {
      console.log("BOOKS:", res);
      this.books = res;
    });
  }

  borrow(livreId:number){
    this.empruntService.create(livreId).subscribe(res => {
      console.log("EMPRUNT CREATED", res);
    });
  }
}
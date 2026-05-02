import { Component, OnInit } from '@angular/core';
import { LivreService } from '../../../core/services/book.service';
import { CategoryService } from '../../../core/services/categorie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-livre',
  templateUrl: './create-livre.component.html'
})
export class CreateLivreComponent implements OnInit {

  isEditMode = false;
  editId: number | null = null;

  categories: any[] = [];

  livre = {
  titre: '',
  auteur: '',
  isbn: '',
  annee: null,
  quantite: null,
  category: {
    id: null
  }
};

  constructor(
    private livreService: LivreService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.isEditMode = true;
      this.editId = Number(id);

      this.livreService.getById(this.editId).subscribe({
        next: (data: any) => {
          this.livre = {
            ...data,
            categoryId: data.category?.id ?? null
          };
        },
        error: (err) => console.error(err)
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data: any[]) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  save(): void {
    if (this.isEditMode && this.editId !== null) {
      this.livreService.update(this.editId, this.livre).subscribe({
        next: () => this.router.navigate(['/admin/livres']),
        error: (err) => console.error(err)
      });
    } else {
      this.livreService.create(this.livre).subscribe({
        next: () => this.router.navigate(['/admin/livres']),
        error: (err) => console.error(err)
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/categorie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html'
})
export class CategoryManagementComponent implements OnInit {

  categories: any[] = [];

  // needed by your HTML
  isEditMode = false;
  editId: number | null = null;

  category = {
    nom: ''
  };

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.load();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.editId = +id;

      this.categoryService.getById(this.editId).subscribe({
        next: (data: any) => {
          this.category = data;
        },
        error: (err) => console.error(err)
      });
    }
  }

  load() {
    this.categoryService.getAll().subscribe({
      next: (data: any[]) => {
        this.categories = data;
      },
      error: (err) => console.error(err)
    });
  }

  save(): void {
    if (this.isEditMode && this.editId !== null) {
      this.categoryService.update(this.editId, this.category).subscribe({
        next: () => {
          this.router.navigate(['/admin/categories']);
          this.load();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.categoryService.create(this.category).subscribe({
        next: () => {
          this.router.navigate(['/admin/categories']);
          this.load();
        },
        error: (err) => console.error(err)
      });
    }
  }

  delete(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  goCreate(): void {
    this.router.navigate(['/admin/categories/create']);
  }

  goEdit(id: number): void {
    this.router.navigate(['/admin/categories/edit', id]);
  }
}
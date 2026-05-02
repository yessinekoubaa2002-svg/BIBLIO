import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/categorie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-category',
  templateUrl: './create-category.component.html'
})
export class CategoryCategoryComponent implements OnInit {

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

  save() {
    if (this.isEditMode && this.editId) {
      this.categoryService.update(this.editId, this.category).subscribe({
        next: () => this.router.navigate(['/admin/categories']),
        error: (err) => console.error(err)
      });
    } else {
      this.categoryService.create(this.category).subscribe({
        next: () => this.router.navigate(['/admin/categories']),
        error: (err) => console.error(err)
      });
    }
  }
}
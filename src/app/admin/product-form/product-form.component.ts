import { Observable, of } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any> = of();

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }
}

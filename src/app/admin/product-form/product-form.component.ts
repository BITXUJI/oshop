import { Observable, of } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any> = of();

  constructor(
    categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
  }
  save(product: any) {
    this.productService.create(product);
  }
}

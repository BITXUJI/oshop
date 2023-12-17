import { Observable, of } from 'rxjs';
import { CategoryService } from '../../category.service';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any> = of();

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
  }
  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}

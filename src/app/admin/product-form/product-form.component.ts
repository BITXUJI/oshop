import { Observable, of, take } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';
import { Component } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any> = of();
  product: any = {};
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1))
        .subscribe(p => this.product = p);
    }
  }

  save(product: Product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this products?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}

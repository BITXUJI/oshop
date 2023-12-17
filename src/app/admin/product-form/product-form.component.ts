import { Observable, of } from 'rxjs';
import { CategoryService } from '../../category.service';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any> = of();
  product: any = {};
  productSubscription$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productSubscription$ = this.productService.get(id)
        .subscribe(p => this.product = p);
    }
  }
  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  ngOnDestory() {
    this.productSubscription$?.unsubscribe();
  }
}

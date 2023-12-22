import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  // products$: Observable<any>;
  categories$: Observable<any>;
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string = '';

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService,
  ) {
    productService.getAll().subscribe(products => this.products = products);

    this.categories$ = categoryService.getAll();

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category') || '';

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.payload.val().category === this.category) :
        this.products;
    });

  }
}

import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string | null = null;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
  ) {
    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.payload.val().category === this.category) :
        this.products;
    });
  }
}

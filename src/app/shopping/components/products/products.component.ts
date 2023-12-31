import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { switchMap, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null = null;
  cart$: Observable<ShoppingCart | null> = of();


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(products => {
      this.products = products as Product[];
      return this.route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category');

      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}

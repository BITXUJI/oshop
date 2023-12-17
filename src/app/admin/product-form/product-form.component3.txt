import { Observable, of } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
    categories$: Observable<any> = of();

    productForm = new FormGroup({
        title: new FormControl('', Validators.required),
        price: new FormControl('', [Validators.required, Validators.min(0)]),
        category: new FormControl('', Validators.required),
        imageURL: new FormControl('', [Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
    });
    constructor(
        categoryService: CategoryService,
        private productService: ProductService) {
        this.categories$ = categoryService.getCategories();
    }

    save() {
        if (this.productForm?.valid) {
            const formData = this.productForm.value;
            this.productService.create(formData);
        }
    }
    get title() {
        return this.productForm.get('title');
    }
    get price() {
        return this.productForm.get('price');
    }
    get category() {
        return this.productForm.get('category');
    }
    get imageURL() {
        return this.productForm.get('imageURL');
    }
}
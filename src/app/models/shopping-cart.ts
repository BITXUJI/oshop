import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    itemsArray: ShoppingCartItem[] = [];

    constructor(public items: { [productId: string]: ShoppingCartItem }) {
        this.items = items || {};
        for (const productId in items) {
            let item = items[productId];
            this.itemsArray.push(new ShoppingCartItem({ ...item, key: productId }));
        }

    }

    get totalItemsCount() {
        let shoppingCartItemCount = 0;
        for (const item of this.itemsArray) {
            shoppingCartItemCount += item.quantity;
        }
        return shoppingCartItemCount;
    }

    get totalPrice() {
        let sum = 0;
        for (const item of this.itemsArray) {
            sum += item.totalPrice;
        }
        return sum;
    }

    getQuantity(product: Product) {
        let item = this.items[product.key];
        return item ? item.quantity : 0;
    }
}
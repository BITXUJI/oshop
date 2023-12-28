import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    itemsArray: ShoppingCartItem[] = [];

    constructor(public items: { [productId: string]: ShoppingCartItem }) {
        for (const productId in items) {
            // this.itemsArray.push(items[productId]);
            let item = items[productId];
            this.itemsArray.push(new ShoppingCartItem(item.product, item.quantity));
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
}
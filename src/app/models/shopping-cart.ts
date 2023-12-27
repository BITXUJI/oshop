import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

    constructor(public items: ShoppingCartItem[]) { }

    get productIds() {
        return Object.keys(this.items);
    }
    get productValues() {
        return Object.values(this.items);
    }
    get totalItemsCount() {
        let shoppingCartItemCount = 0;
        for (const productId in this.items) {
            shoppingCartItemCount += (this.items)[productId as any].quantity;
        }
        return shoppingCartItemCount;
    }
}
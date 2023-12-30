import { ShoppingCartItem } from "./shopping-cart-item";

export interface FirebaseShoppingCart {
    items: { [productId: string]: ShoppingCartItem; }
}
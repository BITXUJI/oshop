export class ShoppingCartItem {

    constructor(public product: {
        title: string;
        price: number;
        category: string;
        imageUrl: string;
    },
        public quantity: number) { }

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}
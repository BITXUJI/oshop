export class ShoppingCartItem {
    title!: string;
    imageUrl!: string;
    price!: number;
    quantity!: number;
    key!: string;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }
    get totalPrice() {
        return this.price * this.quantity;
    }
}
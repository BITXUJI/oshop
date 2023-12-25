export interface ShoppingCartItem {
    product: {
        title: string;
        price: number;
        category: string;
        imageUrl: string;
    };
    quantity: number;
}
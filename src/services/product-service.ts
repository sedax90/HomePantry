import { Product } from "../models/models";
import MOCKED_DATA from '../../assets/mock/products.json';

export class ProductService {
    private static instance: ProductService;
    private products: Product[] = [];

    constructor() {
        if (ProductService.instance) {
            throw new Error("You can only create one instance!");
        }

        this.products = MOCKED_DATA;
    }

    static getInstance(): ProductService {
        if (ProductService.instance) {
            return this.instance;
        }
        else {
            ProductService.instance = new ProductService();
            return ProductService.instance;
        }
    }

    async getProducts(pantry: string): Promise<Product[]> {
        const products = this.products.filter(e => e.pantry === pantry);
        return Promise.resolve(products);
    }

    async getProduct(code: string): Promise<Product> {
        const product = this.products.find(e => e.code === code);

        if (!product) {
            throw new Error("Product not found.");
        }

        return Promise.resolve(product);
    }

    async increaseQuantity(code: string): Promise<void> {
        const product = await this.getProduct(code);
        product.quantity = product.quantity + 1;
    }

    async decreaseQuantity(code: string): Promise<void> {
        const product = await this.getProduct(code);

        if (product.quantity > 0) {
            product.quantity = product.quantity - 1;
        }
    }
}
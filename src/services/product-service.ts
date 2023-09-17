import { Product } from "../models/models";
import MOCKED_DATA from '../../assets/mock/products.json';

export function getProducts(pantry: string): Promise<Product[]> {
    return Promise.resolve(MOCKED_DATA);
}
import { ProductProps } from "../models/models";
import MOCKED_DATA from '../../assets/mock/ean.json';

export class ProductPropsService {
    static getProduct(code: string): Promise<ProductProps | null> {
        const productProps = MOCKED_DATA.find(e => e.code === code);
        return Promise.resolve(productProps ? productProps.product : null);
    }
}
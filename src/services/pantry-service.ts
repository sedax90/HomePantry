import { Pantry } from "../models/models";
import MOCKED_DATA from '../../assets/mock/pantries.json';

export class PantryService {
    static getPantries(home: string): Promise<Pantry[]> {
        return Promise.resolve(MOCKED_DATA);
    }
}
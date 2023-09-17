import { Pantry } from "../models/models";
import MOCKED_DATA from '../../assets/mock/pantries.json';

export function getPantries(home: string): Promise<Pantry[]> {
    return Promise.resolve(MOCKED_DATA);
}
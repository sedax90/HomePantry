import { Home } from "../models/models";
import MOCKED_DATA from '../../assets/mock/homes.json';

export function getHomes(): Promise<Home[]> {
    return Promise.resolve(MOCKED_DATA);
}
import { Home } from "../models/models";
import MOCKED_DATA from '../../assets/mock/homes.json';

export class HomeService {
    static getHomes(): Promise<Home[]> {
        return Promise.resolve(MOCKED_DATA);
    }
}
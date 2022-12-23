import { BaseService } from "./baseService";

export class DirectorService extends BaseService {
    baseUrl = 'https://localhost:44325/director/';
    search(name) {
        return this.Get(this.baseUrl + 'search?name=' + name);
    }
}
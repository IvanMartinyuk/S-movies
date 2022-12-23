import { BaseService } from "./baseService";

export class WriterService extends BaseService {
    baseUrl = 'https://localhost:44325/writer/';
    search(name) {
        return this.Get(this.baseUrl + 'search?name=' + name);
    }
}
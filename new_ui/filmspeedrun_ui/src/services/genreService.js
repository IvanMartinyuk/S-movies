import { BaseService } from "./baseService";

export class GenreService extends BaseService {
    baseUrl = 'https://localhost:44325/genre/';
    async all() {
        return this.Get(this.baseUrl + "all");
    }
}
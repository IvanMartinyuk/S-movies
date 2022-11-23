import { BaseService } from "./baseService";

export class FilmService extends BaseService {
    baseUrl = 'https://localhost:44325/film/';
    GetPage(page) {
        return this.Get(this.baseUrl + "GetPage?page=" + page)
    }
}
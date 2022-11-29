import { BaseService } from "./baseService";

export class FilmService extends BaseService {
    baseUrl = 'https://localhost:44325/film/';
    getPage(page) {
        return this.Get(this.baseUrl + "GetPage?page=" + page);
    }
    getFilm(id) {
        return this.Get(this.baseUrl + "get?filmId=" + id);
    }
    getScreenshots(id)
    {
        return this.Get(this.baseUrl + "screenshots?filmId=" + id);
    }
}
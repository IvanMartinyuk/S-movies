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
    getGenres(id) {
        return this.Get(this.baseUrl + "genres?filmId=" + id);
    }
    getActors(id) {
        return this.Get(this.baseUrl + "actors?filmId=" + id);
    }
    getWriters(id) {
        return this.Get(this.baseUrl + "writers?filmId=" + id);
    }
    getDirectors(id) {
        return this.Get(this.baseUrl + "directors?filmId=" + id);
    }
}
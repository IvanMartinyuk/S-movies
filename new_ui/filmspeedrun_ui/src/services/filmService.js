import { BaseService } from "./baseService";

export class FilmService extends BaseService {
    baseUrl = 'https://localhost:44325/film/';
    getPage(page, filter = false) {
        if(!filter)
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
    async search(title) {
        return await this.Get(this.baseUrl + 'search?search=' + title);
    }
    getPageCount() {
        return this.Get(this.baseUrl + 'getpagecount');
    }
    vote(vote, filmId) {
        return fetch(this.baseUrl + 'vote?vote=' + vote + '&filmId=' + filmId, 
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'bearer ' + sessionStorage.getItem("accessToken")
                        }
                    });
    }
    async getByFilter(options) {
        console.log(options);
        let response = await fetch(this.baseUrl + "getByFilter",
            {
                method: "POST",
                headers: this.baseHeaders,
                body: JSON.stringify(options)
            });
        let responseData = response.json();
        return responseData;
    }
}
import { BaseService } from "./baseService";

export class SelectionService extends BaseService
{
    baseUrl = 'https://localhost:44325/selection/';
    GetTop(page)
    {
        return this.Get(this.baseUrl + 'gettop?page=' + page);
    }
    GetSelection(id)
    {
        return this.Get(this.baseUrl + 'get?selectionId=' + id)
    }
    GetFilms(id)
    {
        return this.Get(this.baseUrl + 'films?selectionId=' + id)
    }
    create(selection) {
        return this.Post(this.baseUrl + "post", this.baseHeaders, selection);
    }
    addFilms(selId, films) {
        let data = {
            selId: selId,
            filmIds: films
        }
        return this.Put(this.baseUrl + 'addFilms', this.baseHeaders, data);
    }
    async search(title) {
        let response = await fetch(this.baseUrl + 'search?title=' + title, {
            method: 'GET',
            headers: this.baseHeaders
        })
        return await response.json();
    }
    async searchByUser(title) {
        let response = await fetch(this.baseUrl + 'searchbyuser?title=' + title, {
            method: 'GET',
            headers: this.baseHeaders
        })
        return await response.json();
    }
    getPageCount() {
        return this.Get(this.baseUrl + 'getpagecount');
    }
}
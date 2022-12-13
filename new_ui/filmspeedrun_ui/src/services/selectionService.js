import { BaseService } from "./baseService";

export class SelectionService extends BaseService
{
    baseUrl = 'https://localhost:44325/selection/';
    GetTop()
    {
        return this.Get(this.baseUrl + 'gettop');
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
}
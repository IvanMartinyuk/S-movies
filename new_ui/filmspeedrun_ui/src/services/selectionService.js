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
}
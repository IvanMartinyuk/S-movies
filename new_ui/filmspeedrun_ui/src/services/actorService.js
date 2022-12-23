import { BaseService } from "./baseService";

export class ActorService extends BaseService {
    baseUrl = 'https://localhost:44325/actor/';
    search(name) {
        return this.Get(this.baseUrl + 'search?name=' + name);
    }
}
import { BaseService } from "./baseService";

export class UserService extends BaseService {    
    baseUrl = 'https://localhost:44325/user/'
    baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("accessToken")
    }
    async token(user) {
        let data = await this.Post(this.baseUrl + 'token',
                                {
                                    'Content-Type': 'application/json'
                                },
                                user);
        if(data.error === undefined)
        {
            sessionStorage.setItem('accessToken', data.access_token);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('userId', data.id);
            return true;
        }
        else {
            return false;
        }
    }
    async checkLogin(login)
    {
        return fetch(this.baseUrl + 'checkLogin?login=' + login);
    }
    async registration(user) {
        return this.PostWithoutJson(this.baseUrl + 'registration', this.baseHeaders, user);
    }
}
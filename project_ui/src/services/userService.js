import hash from "./passwordService"

export default class userService {
    static isLogin = false
    static login = ''
    static isAdmin = false;
    baseUrl = 'https://localhost:44325/user/'
    async login(login, password) {
        let user = {
            login: login,
            passwordHash: hash(password)
        }
        console.log(user)
        let response = await fetch(this.baseUrl + 'token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        userService.isLogin = response.ok
        let data = await response.json()
        userService.login = data.username
        sessionStorage.setItem('access_token', data.access_token)
        return response.ok
    }
    async registration(login, email, password) {
        let user = {
            login: login,
            email: email,
            passwordHash: hash(password)
        }
        let response = await fetch(this.baseUrl + 'registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return response.ok
    }
    async setIsAdmin(login)
    {
        
    }
}
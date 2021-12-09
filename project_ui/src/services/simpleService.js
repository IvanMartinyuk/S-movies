export class simpleService {
    baseUrl = 'https://localhost:44325/'
    name = ''
    constructor(controllerName)
    {
        this.baseUrl += controllerName + '/'
        this.name = controllerName
    }
    async get(id)
    {
        let response = await fetch(this.baseUrl + 'get' + '?' + this.name + 'Id=' + id, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json()
        return data
    }
    async response(method, entity) {
        const token = sessionStorage.getItem('access_token')
        let path = this.baseUrl + method
        let m = method.toUpperCase()
        if(m === 'DELETE')
        {
            path = this.baseUrl + method + '?' + this.name + 'Id=' + entity
            fetch(path, {
                method: m,
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token
                }
            })
        }
        if(m !== 'POST' && m !== 'PUT' && m !== 'DELETE')
        {
            m = 'GET'
            fetch(path, {
                method: m,
                header: {
                    'Content-Type': 'application/json'
                }
            })
        }
        let response = await fetch(path, {
            method: m,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(entity)
        })
        let data = await response.json()
        return data
    }
}
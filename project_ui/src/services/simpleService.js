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
        let path = this.baseUrl + method+ '?' + this.name + 'Id=' + entity
        let m = method.toUpperCase()
        if(m === 'DELETE')
        {
            path = this.baseUrl + method + '?' + this.name + 'Id=' + entity
            let response = await fetch(path, {
                method: m,
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token
                }
            })
            let data = await response.json()
            return data
        }
        if(m !== 'POST' && m !== 'PUT' && m !== 'DELETE')
        {
            m = 'GET'
            let response = await fetch(path, {
                method: m,
                header: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json()
            return data
        }
        let response = await fetch(path, {
            method: m,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
           // body: JSON.stringify(entity)
        })
        let data = await response.json()
        return data
    }
    async POST( entity){
        let path = this.baseUrl +'post'
        const token = sessionStorage.getItem('access_token')
        console.log(path)
        console.log(entity)
        let response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(entity)
        })
        let data = await response.ok
        return data
    }
    async PUT(entity){
        let path = this.baseUrl +'put'
        const token = sessionStorage.getItem('access_token')
        console.log(path)
        console.log(entity)
        let response = await fetch(path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(entity)
        })
        let data = await response.ok
        return data
    }
    async DELETE( entity){
        let path = this.baseUrl +'delete?'+this.name+'Id='+entity
        const token = sessionStorage.getItem('access_token')
        console.log(path)
        console.log(entity)
        let response = await fetch(path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            }
           
        })
        let data = await response.ok
        return data
    }
}
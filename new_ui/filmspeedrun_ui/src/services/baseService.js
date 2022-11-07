export class BaseService
{

    async Get(url)
    {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    // async Post(url, token, data)
    // {
    //     let response = await fetch(url,
    //         {
    //             method: "POST",
    //             headers:
    //             {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'bearer ' + token
    //             },
    //             body: JSON.stringify(data)
    //         });
    //     let data = await response.ok;
    //     return data;
    // }
    // async Put(url, token, data)
    // {
    //     let response = await fetch(url,
    //         {
    //             method: "PUT",
    //             headers:
    //             {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'bearer ' + token
    //             },
    //             body: JSON.stringify(data)
    //         });
    //     let data = await response.ok;
    //     return data;
    // }
    // async Delete(url, token)
    // {
    //     let response = await fetch(url,
    //         {
    //             method: "DELETE",
    //             headers:
    //             {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'bearer ' + token
    //             }
    //         });
    //     let data = await response.ok;
    //     return data;
    // }
}
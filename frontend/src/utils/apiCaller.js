import tokenHandler from "./tokenHandler"

const apiCaller = (()=>
{
    let headers = tokenHandler.headers
    let apiURL = 'http://127.0.0.1:8000/todos/api/v1/'

    const authenticationCall = (type, body)=>
    {
        type = type.toLowerCase()
        return fetch(`${apiURL}${type}`, {
            method:"POST",
            headers: headers,
            body: JSON.stringify(body)
        })
        .then((response)=>response.json())
        .then((data)=>data)
    }
    const taskCall = (type, method, body)=>
    {
        
    }
    return {authenticationCall}
})()

export default apiCaller

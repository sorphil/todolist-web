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
        .then((data)=>{
            console.log(data)
            return data
        })
    }
    const taskCall = (formName, body)=>
    {
        return fetch(`${apiURL}task-create`, {
            method:"POST",
            headers: headers,
            body: JSON.stringify(body)
        })
        .then((response)=>response.json())
        .then((data)=>{ console.log(data); return data;})
    }
    const projectCall = (formName, body)=>
    {
        return fetch(`${apiURL}project-create`, {
            method:"POST",
            headers: headers,
            body: JSON.stringify(body)
        })
        .then((response)=>response.json())
        .then((data)=>{ console.log(data); return data;})
    }
    return {authenticationCall, taskCall, projectCall}
})()

export default apiCaller

import tokenHandler from "./tokenHandler"

const apiCaller = (()=>
{
    let headers = tokenHandler.headers
    let apiURL = 'http://127.0.0.1:8000/todos/api/v1/'

    const postCall = (prefix, type, body)=>
    {
        type = type.toLowerCase()
        return fetch(`${apiURL}${prefix}${type}`, {
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

    const getCall =  (prefix, type)=>{
        return fetch(`${apiURL}${prefix}${type}`,{
            method:"GET",
            headers: headers,
        })
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data)
            return data
        })
    }
    const taskCall = (type, body, method)=>
    {
        return fetch(`${apiURL}task-${type}`, {
            method:method,
            headers: headers,
            body: method=="GET"?{}:JSON.stringify(body)
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
    return {postCall, getCall}
})()

export default apiCaller

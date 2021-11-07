
const tokenHandler = (()=>
{
    let headers = 
    {
        "Content-Type": "application/json",                                                                                            
    }

    const addHeaderToken = (token)=>
    {   
        if (token===undefined) return
        tokenHandler.headers["Authorization"]=`Token ${token}`
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('headers', headers)
        console.log(headers)
    }
    const deleteHeaderToken = ()=>
    {
        console.log("DELETED")
        delete tokenHandler.headers["Authorization"]
        window.localStorage.removeItem('token')
        console.log(headers)
    }

    return {headers, addHeaderToken, deleteHeaderToken}
})()





export default tokenHandler
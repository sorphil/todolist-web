
const tokenHandler = (()=>
{
    let headers = 
    {
        "Content-Type": "application/json",                                                                                            
        // "Access-Control-Origin": "*",
        // "Access-Control-Allow-Headers": "Accept"
    }

    const addHeaderToken = (token)=>
    {   
        if (token===undefined) return
        headers["Authorization"]=`Token ${token}`
        window.localStorage.setItem('token', token)
        console.log(headers)
    }
    const deleteHeaderToken = ()=>
    {
        delete headers["Authorization"]
        window.localStorage.removeItem('token')
        console.log(headers)
    }

    return {headers, addHeaderToken, deleteHeaderToken}
})()





export default tokenHandler
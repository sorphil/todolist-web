import apiCaller from "./utils/apiCaller"
import formHandler from "./utils/formHandler"
import tokenHandler from "./utils/tokenHandler"

const functionInterface = (()=>{
    const authenticationForm = (formName)=>{
        const form = document.querySelector(`#${formName}-form`)
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            let body = formHandler.getFormInputs(formName)
            apiCaller.authenticationCall(formName, body)
            .then(data=>{
                console.log(data)
                // if ()
                {
                    (formName==='register'||formName==='login' &&data.success)?tokenHandler.addHeaderToken(data.token):tokenHandler.deleteHeaderToken()
                }
                // else
                // {
                //     console.log("ERRORS")
                // }
            })
            
        })
    }
    return {authenticationForm}
})()

export default functionInterface
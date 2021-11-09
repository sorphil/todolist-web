import apiCaller from "./utils/apiCaller"
import errorHandler from "./utils/errorHandler"
import formHandler from "./utils/formHandler"
import htmlHandler from "./utils/htmlHandler"
import tokenHandler from "./utils/tokenHandler"
import authenticationPage from "./components/authentication"

const functionInterface = (()=>{
    const  returnUserStatus = ()=>{
        if(window.localStorage.getItem('token')!==null)
        {
            tokenHandler.addHeaderToken(window.localStorage.getItem('token'))
        }
        else
        {
            tokenHandler.deleteHeaderToken()
        }
        return apiCaller.authenticationCall('check', {})
        
    }

    const checkUserStatus = ()=>{
        returnUserStatus().then(data=>data.success)
        .then(result=>console.log(result))
    }







    const authenticationForm = (formName, hasErrors)=>{
        const form = document.querySelector(`#${formName}-form`)
        console.log(form)
        let inputs = formHandler.getFormInputs(formName)
        if(hasErrors){errorHandler.addErrorEvents(inputs)}
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            let body = formHandler.getFormValues(formName)
            apiCaller.authenticationCall(formName, body)
            .then(data=>{
                if (data.success)
                {
                    if(formName==='register'||formName==='login'||formName==='check' && data.success)
                    {
                        tokenHandler.addHeaderToken(data.token)
                    }
                    else
                    {
                        tokenHandler.deleteHeaderToken()
                    }
                }
                else
                {   
                    if(hasErrors)
                    {
                        let errorObjects = errorHandler.getInputErrors(data, formName)
                        htmlHandler.inputErrorMessage(errorObjects)
                    }
                }
            })
            
        })
    }
    const taskForm = (formName)=>
    {
        const form = document.querySelector(`#${formName}-form`)
        let inputs = formHandler.getFormInputs(formName)
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            let body = formHandler.getFormValues(formName)
            // console.log(body)
            apiCaller.taskCall(formName, body)
        })
    }

    const projectForm = (formName)=>
    {
        const form = document.querySelector(`#${formName}-form`)
        let inputs = formHandler.getFormInputs(formName)
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            let body = formHandler.getFormValues(formName)
            // console.log(body)
            apiCaller.projectCall(formName, body)
        })
    }
    return {authenticationForm, checkUserStatus, taskForm, projectForm, }
})()

export default functionInterface
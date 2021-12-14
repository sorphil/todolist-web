import apiCaller from "./utils/apiCaller"
import errorHandler from "./utils/errorHandler"
import formHandler from "./utils/formHandler"
import htmlHandler from "./utils/htmlHandler"
import tokenHandler from "./utils/tokenHandler"
import authenticationPage from "./components/authentication"
import animationHandler from "./utils/animationHandler"
import indexPage from "./components/index"

const functionInterface = (()=>{
    const returnUserStatus = ()=>{
        if(window.localStorage.getItem('token')!==null)
        {
            tokenHandler.addHeaderToken(window.localStorage.getItem('token'))
        }
        else
        {
            tokenHandler.deleteHeaderToken()
        }
        return apiCaller.postCall('check', "", {})
    }

    const changePage = (pageName, parent)=>{
        console.log("CHANGED", pageName)
        htmlHandler.clearDIV(parent)
        authenticationPage.generateAuthenticationForms(pageName, '')
    }


    const startingPage = ()=>{
        
        returnUserStatus().then(data=>{
            if(data.success==true)
            {
                console.log("Open index")
                window.localStorage.getItem('user')
                indexPage.generateMainPage()
                return data
            }
            else
            {
                authenticationPage.generateAuthenticationForms('login')
                return data
            }
        })
        .then((data)=>{
            if (data.success==true)
            {
                animationHandler.openIndex(document.querySelector('.index-container'))
                
                return data
            }
            else
            {
                animationHandler.openForm(document.querySelector('.form-container'))
                return data
            }
            
        })
        .then((data)=>{
            if (data.success==true)
            {
                functionInterface.authenticationForm('logout', false)
            }
            else
            {
                functionInterface.authenticationForm('login', true)
            }
           
        })
    } 
    
    
    const authenticationForm = (formName, hasErrors)=>{
        const form = document.querySelector(`#${formName}-form`)
        let inputs = formHandler.getFormInputs(formName)
        if(hasErrors){errorHandler.addErrorEvents(inputs)}
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            let inputs
            let body = {}
            if(formName!="logout")
            {
                inputs = document.querySelector('input')
                htmlHandler.removeInputError(inputs)
                body = formHandler.getFormValues(formName)
            }
            apiCaller.postCall(formName, "", body)
            .then(data=>{
                if (data.success)
                {
                    if(formName==='register'||formName==='login'||formName==='check')
                    {
                        tokenHandler.addHeaderToken(data.token)
                        window.localStorage.setItem('user', data.user)
                        location.reload()
                    }
                    else
                    {
                        tokenHandler.deleteHeaderToken()
                        location.reload()
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
    const taskForm = (type)=>
    {
        const form = document.querySelector(`#task-form`)
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            let body = formHandler.getFormValues("task", type)
            // console.log(body)
            apiCaller.postCall(formName, body)
        })
    }

    return {authenticationForm, startingPage, taskForm, changePage}
})()

export default functionInterface
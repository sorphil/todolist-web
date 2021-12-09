import functionInterface from "../functionInterface"
import htmlHandler from "../utils/htmlHandler"
import animationHandler from "../utils/animationHandler"

const authenticationPage = (()=>{  
    const formHeaders = {'login':"SIGN IN TO YOUR ACCOUNT", "register":"CREATE AN ACCOUNT"} 
    const formNavs = {
        'login':'<span id = "login-navs-text">Not registered?</span> <span id = "login-navs-link" class = "form-navs-link">Create an account</span>',
        'register':'<span id = "register-navs-text">Already have an account?</span> <span Sign id = "register-navs-link" class = "form-navs-link">Log in</span>',
        }
    const generateAuthenticationForms = (formName)=>{
        let inputs = {}
        if(formName=='login'||formName=='register')
        {
            //(formName, inputName, inputType, hasErrors
            inputs['email'] = htmlHandler.generateHTMLInputGroup(formName, "email", "email", true)
            inputs['password'] =htmlHandler.generateHTMLInputGroup(formName, 'password', 'password', true)
            inputs['button'] = htmlHandler.generateHTMLElement('button', {
                "id":`${formName}-button-input`,
                "className":"form-button",
                "name":"submit",
                "innerHTML":"Log In"
            })

            if (formName =="register")
            {
                inputs['username'] = htmlHandler.generateHTMLInputGroup(formName, 'username', 'text', true)
                inputs['confirm'] = htmlHandler.generateHTMLInputGroup(formName, 'confirm', 'password', true)
                inputs['button'] = htmlHandler.generateHTMLElement('button', {
                    "id":`${formName}-button-input`,
                    "className":"form-button",
                    "name":"submit",
                    "innerHTML":"Sign Up"
                })
            }
        }
        const container = htmlHandler.generateHTMLForm(formName, formHeaders, inputs)
        
        const navs = htmlHandler.generateHTMLElement('div', {"className":"form-navs", "innerHTML":formNavs[formName]})
        container.appendChild(navs)
        document.querySelector('body').appendChild(container)
        _addNavEvents(formName)
    }
    const _addNavEvents = (formName)=>{
        const formLink = document.querySelector(`#${formName}-navs-link`)
        formLink.addEventListener('click', ()=>{
            functionInterface.changePage(formName=='register'?'login':'register', document.querySelector('body'))
            animationHandler.openForm(document.querySelector('.form-container'))
            functionInterface.authenticationForm(formName=='register'?'login':'register', true)
        })
    }
    return {generateAuthenticationForms,}
})()

export default authenticationPage

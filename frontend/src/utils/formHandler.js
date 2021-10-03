import apiCaller from "./apiCaller"

const formHandler = (()=>
{
    const getFormInputs = (formName)=>{
        let data = {}
        formName = formName.toLowerCase()
        const form = document.querySelector(`#${formName}-form`)
        // console.log(form)
        for (let i = 0, element; element = form[i]; i++) // Obtain form input values
        {
            if(element.name!="") // if it doesn't have a name, it's a submit button
            {
                console.log(element)
                data[element.name] = element.value
            }
        }
      
        return data
    }

    // const addFormEvents = (formName, method)=>{
    //     const form = document.querySelector(`#${formName}-form`)
    //     form.addEventListener('submit', (e)=>{
    //         let body = getFormInputs(formName)
    //         e.preventDefault()
    //         apiCaller.authenticationCall(formName, method, body)
    //     })
    // }
    return {getFormInputs}
})()

export default formHandler
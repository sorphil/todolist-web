const formHandler = (()=>
{
    const getFormInputs = (formName)=>{
        let data = {}
        formName = formName.toLowerCase()
        const form = document.querySelector(`#${formName}-form`)
        for (let i = 0, element; element = form[i]; i++) // Obtain form input values
        {
            if(element.name!="submit") // if it doesn't have a name, it's a submit button
            {
                data[element.name] = element
            }
        }
 
        return data
    }
    const getFormValues = (formName, id)=>{
        let data = {}
        formName = formName.toLowerCase()
        console.log(`#${formName}-form${(id)?`-${id}`:""}`)
        const form = document.querySelector(`#${formName}-form${(id)?`-${id}`:""}`)

        console.log(form, `#${formName}-form${(id)?`-${id}`:""}`)
        for (let i = 0, element; element = form[i]; i++) // Obtain form input values
        {
            if(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)
            {
                console.log(element)
                if(element.name!="submit") // if it doesn't have a name, it's a submit button
                {
                    data[element.name] = element.value
                }
            }
           
        }
        return data
    }


    return {getFormInputs,getFormValues}
})()

export default formHandler

    // const addFormEvents = (formName, method)=>{
    //     const form = document.querySelector(`#${formName}-form`)
    //     form.addEventListener('submit', (e)=>{
    //         let body = getFormValues(formName)
    //         e.preventDefault()
    //         apiCaller.authenticationCall(formName, method, body)
    //     })
    // }
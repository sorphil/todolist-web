import htmlHandler from "./htmlHandler"

const errorHandler = (()=>
{
    const getInputErrors = (data, formName)=>{
        let errors = {}
        for (let input in data)
        {
            let len = Object.getOwnPropertyNames(data).length
            if(input ==='success') break
            let error =  len>2?data[input][0]:data[input]
            let inputDIV = document.querySelector(`#${formName}-${input}-input`)
            let errorDIV = inputDIV.previousElementSibling
            errors[input] = {'inputDIV':inputDIV, 'errorDIV': errorDIV, 'message':error}
        }
        console.log(errors)
        return errors
    }


    const addErrorEvents = (formInputs)=>{
        for(let input in formInputs)
        {
            formInputs[input].addEventListener('keyup', ()=>htmlHandler.removeInputError(formInputs[input]))
        }
    }
    return {getInputErrors, addErrorEvents}
})()

export default errorHandler
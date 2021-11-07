const htmlHandler =(()=>
{
    const inputErrorMessage = (errors)=>{
        for(let error in errors)
        {
            errors[error].errorDIV.innerHTML = errors[error].message
            errors[error].errorDIV.classList.add('active') 
            errors[error].inputDIV.classList.add('error')
        }
    }
    const removeInputError = (formInput)=>
    {
        if(formInput.classList.contains('error'))
        {
            formInput.classList.remove('error')
            formInput.previousElementSibling.classList.remove('active')
        }
    }
    return {inputErrorMessage, removeInputError}
})()

export default htmlHandler
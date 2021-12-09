

const htmlHandler =(()=>
{
    const appendChildrenNodes = (parentNode, childrenNodes)=>{
        if(childrenNodes!=undefined)
        {
            for(let i = 0; i<childrenNodes.length; i++)
            {
                parentNode.appendChild(childrenNodes[i])
            }
        }
        return parentNode
    }
    const clearDIV = (parent)=>{
        parent.innerHTML = ""
    }
    const generateHTMLElement = (elementType, properties)=>{
        const element = document.createElement(elementType)
        if(properties!=undefined)
        {
            for(let property in properties)
            {
                element[property]=properties[property]
            }
        }
        return element
    }

    const appendFormInputs = (form, formName, inputs)=>{
        let result = htmlHandler.appendChildrenNodes(form, [inputs['email'], inputs['password'], inputs['button']])
        if(formName=='register')
        {
            result.insertBefore(inputs['username'], form.querySelector(`#${formName}-email`))
            result.insertBefore(inputs['confirm'], form.querySelector(`button`))
        }
        return result
    }

    const generateHTMLInputGroup = (formName, inputName, inputType, hasErrors)=>{
        const inputGroup = generateHTMLElement('div',{
            "id":`${formName}-${inputName}`, 
            "className":'input-group'
        })
        if (hasErrors)
        {
            const divError = generateHTMLElement('div', {"className":"form-error", "innerHTML":"Placeholder Error"})
            inputGroup.appendChild(divError)
        }
        const input = generateHTMLElement('input',{
            "id":`${formName}-${inputName}-input`,
            "className":'form-input',
            "type": inputType,
            "name": inputName,
            "placeholder":`${inputName.charAt(0).toUpperCase()}${inputName.substring(1)}`
        })
        inputGroup.appendChild(input)

        const label = generateHTMLElement('label', {
            "className":"form-label",
            "htmlFor":`${formName}-${inputName}-input`,
            "innerHTML":`${inputName.charAt(0).toUpperCase()}${inputName.substring(1)}`
        })
        inputGroup.appendChild(label)

        return inputGroup
    }

    const generateHTMLForm = (formName, formHeaders, inputs)=>{
        const formBlock = generateHTMLElement('div', {"className":"form-block"})
        const container = generateHTMLElement('div', {"className":"form-container closed"})

        const header = generateHTMLElement('div', {"className":"form-header", "innerHTML":`<h1>${formHeaders[formName]}</h1>`})
        let form = generateHTMLElement('form', {"id":`${formName}-form`})
        form = appendFormInputs(form, formName, inputs)
        formBlock.appendChild(form)
        container.appendChild(header)
        container.appendChild(formBlock)
        return container
    }

    
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
    return {appendChildrenNodes,generateHTMLElement, generateHTMLInputGroup, generateHTMLForm, inputErrorMessage, removeInputError, clearDIV}
})()

export default htmlHandler
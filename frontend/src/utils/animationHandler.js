
const animationHandler = (()=>{
    const openIndex = (parentElement)=>{
        parentElement.classList.remove('closed')
        parentElement.classList.add('open')
        parentElement.addEventListener('animationend', ()=>{
            parentElement.querySelectorAll('.index-container > div').forEach(childElement=>{
                childElement.classList.add('open')
                childElement.addEventListener('animationend', function(event){
                    event.stopPropagation()
                    this.classList.remove('open')
                    this.style.opacity = 1
                })
            })
            parentElement.classList.remove('open')
            document.querySelector('.header-container').classList.remove('closed')
        })
    }
    const openForm = (parentElement)=>{
        parentElement.classList.remove('closed')
        parentElement.classList.add('open')
        parentElement.addEventListener('animationend', ()=>{
            parentElement.querySelectorAll('.form-container > div').forEach(childElement=>{
                childElement.classList.add('open')
                childElement.addEventListener('animationend', function(event){
                    event.stopPropagation()
                    this.classList.remove('open')
                    this.style.opacity = 1
                })
            })
            parentElement.classList.remove('open')
        })
    }
    return {openForm, openIndex}
})()

export default animationHandler
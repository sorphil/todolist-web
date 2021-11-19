
const animationHandler = (()=>{
    const openAnimations = (parentElement)=>{
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
    return {openAnimations}
})()

export default animationHandler
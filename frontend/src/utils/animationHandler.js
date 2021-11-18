
const animationHandler = (()=>{
    const openAnimations = (parentElement)=>{
        console.log("ASDAD")
        parentElement.classList.toggle('closed')
        parentElement.classList.toggle('open')
        parentElement.addEventListener('animationend', ()=>{
            parentElement.querySelectorAll('div').forEach(childElement=>{
                childElement.classList.add('open');
                childElement.addEventListener('animationend', function(){this.style.opacity = 1})
            })
            parentElement.classList.remove('open')
        })
    }
    return {openAnimations}
})()

export default animationHandler
import functionInterface from "./functionInterface"
import "./styles/styles.scss"
// document.addEventListener('DOMContentLoaded', ()=>{

//     functionInterface.checkUserStatus()
//     //authenticationForm('formname', hasErrors)
//     functionInterface.authenticationForm('register', true)
//     
// 
//     // functionInterface.authenticationForm('check', false)
//     functionInterface.taskForm('task-create')
//     functionInterface.projectForm('project-create')
// })


document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('.form-container')
    form.classList.toggle('closed')
    form.classList.toggle('open')
    form.addEventListener('animationend', ()=>{
        form.querySelectorAll('div').forEach(div=>{
            div.classList.add('open');
            div.addEventListener('animationend', function(){this.style.opacity = 1})
        })
        form.classList.remove('open')
    })
    functionInterface.authenticationForm('login', true)
    functionInterface.authenticationForm('logout', false)
    // functionInterface.checkUserStatus()
    // console.log(functionInterface.checkUserStatus())
    functionInterface.startingPage()
})
import functionInterface from "./functionInterface"
import "./styles/styles.scss"
document.addEventListener('DOMContentLoaded', ()=>{
   
    functionInterface.authenticationForm('register')
    functionInterface.authenticationForm('login')
    functionInterface.authenticationForm('logout')
    functionInterface.authenticationForm('check')
})
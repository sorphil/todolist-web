import "./styles/styles.scss"
var headers = {
    "Content-Type": "application/json",                                                                                                
    "Access-Control-Origin": "*"
 }

document.addEventListener('DOMContentLoaded', ()=>{
    registrationBtn = document.querySelector('#registrationBtn')
    registrationBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let email = document.querySelector('#registrationEmail').value
        let username = document.querySelector('#registrationUsername').value
        let password = document.querySelector('#registrationPassword').value
        let password2 = document.querySelector('#registrationPassword2').value
        let data = {
            "email": email,
            "username": username,
            "password": password,
            "password2": password2
        }

        fetch("http://127.0.0.1:8000/todos/api/v1/register", {
            method: "POST",
            headers: headers,
            body:  JSON.stringify(data)
        })
        .then(function(response){ 
            return response.json(); 
        })
        .then(function(data){ 
            console.log(data)
        });
    })
})
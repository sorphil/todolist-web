import "./styles/styles.scss"
var headers = {
    "Content-Type": "application/json", }                                                                                               
//     "Access-Control-Origin": "*",
//     "Access-Control-Allow-Headers": "Accept"
//  }

document.addEventListener('DOMContentLoaded', ()=>{
    registrationForm = document.querySelector('#registrationForm')
    registrationForm.addEventListener('submit', (e)=>{
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

        console.log(data)

        fetch("http://127.0.0.1:8000/todos/api/v1/register", {
            method: "POST",
            headers: headers,
            body:  JSON.stringify(data)
        })
        .then(function(response){ 
           return response.json()
        })
        .then(function(data){ 
            console.log(data)
        });
    })
})
import "./styles/styles.scss"
let headers = {
    "Content-Type": "application/json",                                                                                            
    // "Access-Control-Origin": "*",
    // "Access-Control-Allow-Headers": "Accept"
 }

document.addEventListener('DOMContentLoaded', ()=>{
    
    let registrationForm = document.querySelector('#registration-form')
    registrationForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let email = document.querySelector('#registration-email-input').value
        let username = document.querySelector('#registration-username-input').value
        let password = document.querySelector('#registration-password-input').value
        let confirm = document.querySelector('#registration-confirm-input').value
        let data = {
            "email": email,
            "username": username,
            "password": password,
            "confirm": confirm
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
            window.localStorage.setItem('token', data.token)
            console.log(data)
        });
    })

    let loginForm = document.querySelector('#login-form')
    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        console.log(headers)
        let email = document.querySelector('#login-email-input').value
        let password = document.querySelector('#login-password-input').value
        let data = {
                "email": email,
                "password": password,
            }

        fetch("http://127.0.0.1:8000/todos/api/v1/login", {
            method: "POST",
            headers: headers,
            body:  JSON.stringify(data)
        })
        .then(function(response){ 
           return response.json()
        })
        .then(function(data){ 
            window.localStorage.setItem('token', data.token)
            console.log(data)
        });
    })
    let logoutForm = document.querySelector('#logoutForm')
    logoutForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        headers["Authorization"] = `Token ${window.localStorage.getItem('token')}`
        fetch("http://127.0.0.1:8000/todos/api/v1/logout", {
            method: "POST",
            headers: headers,
        })
        .then(function(response){ 
           return response.json()
        })
        .then(function(data){ 
            window.localStorage.setItem('token', "")
            delete headers['Authorization']
            console.log(headers)
            console.log(data)
        });
    })
    let checkForm = document.querySelector('#checkForm')
    checkForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        headers["Authorization"] = `Token ${window.localStorage.getItem('token')}`
        console.log(headers)
        fetch("http://127.0.0.1:8000/todos/api/v1/check", {
            method: "POST",
            headers: headers,
        })
        .then(function(response){ 
           return response.json()
        })
        .then(function(data){ 
            console.log(data)
        });
    })
})
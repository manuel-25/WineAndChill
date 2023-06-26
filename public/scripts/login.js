const loginButton = document.getElementById('login')

loginButton.addEventListener('click', (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const cookies = document.getElementById('keepSession').checked
    console.log(cookies)
    console.log({email, password})
    fetch('/api/session/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(res => console.log(res.message))
})
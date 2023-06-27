const registerButton = document.getElementById('register')

registerButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value

    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value

    fetch('/api/auth/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password, confirmPassword})
    })
    .then(response => response.json())
    .then(data => {
        console.log('response: ',data)
    })
})

 /*fetch(`/api/cookies/set/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
            })
            .catch(error => console.log(error))*/
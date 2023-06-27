const registerButton = document.getElementById('register')

registerButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value

    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value
    const age = document.getElementById('age').value

    fetch('/api/auth/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, age, password, confirmPassword})
    })
    .then(response => response.json())
    .then(data => {
        console.log('response: ',data)
    })
})
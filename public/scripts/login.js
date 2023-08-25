const loginButton = document.getElementById('login')
const githubButton = document.querySelector('.form-button.github')
console.log(githubButton)
const URL_PRODUCTS = '/products'
const URL_GITHUB = '/api/auth/github/callback'

loginButton.addEventListener('click', (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const rememberMe = document.getElementById('keepSession').checked

    fetch('/api/auth/signin',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password, rememberMe})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (!data.success) {
            Swal.fire({
                icon: 'error',
                title: 'Try Again',
                text: 'Invalid credentials',
            })
        }
        window.location.href = URL_PRODUCTS
    })
})

githubButton.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = URL_GITHUB
})
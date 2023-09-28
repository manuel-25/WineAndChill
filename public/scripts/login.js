const loginButton = document.getElementById('login')
const githubButton = document.querySelector('.form-button.github')
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
                text: data.error || data.message || 'Invalid credentials',
            })
        } else {
            const returnUrl = getQueryParam(currentUrl, 'returnTo')
            if (returnUrl) {
                window.location.href = returnUrl
              } else {
                window.location.href = URL_PRODUCTS
              }
        }
    })
})

githubButton.addEventListener('click', (event) => {
    event.preventDefault()
    const returnUrl = getQueryParam(window.location.href, 'returnTo')
    if(returnUrl) document.cookie = `returnTo=${returnUrl}; max-age=120;`
    window.location.href = URL_GITHUB
})
const currentUrl = window.location.href

// Función para obtener el valor de un parametro de consulta de la URL
function getQueryParam(url, paramName) {
    const params = new URLSearchParams(url.split('?')[1])
    return params.get(paramName)
}
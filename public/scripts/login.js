const loginButton = document.getElementById('login')
const URL_PRODUCTS = '/products'

loginButton.addEventListener('click', (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const cookies = document.getElementById('keepSession').checked

    fetch('/api/auth/signin',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Login successful!',
            }).then((res)=>{
                //Si acepta las cookies las guardo con la api
                if (cookies) {
                    fetch(`/api/cookies/set/${email}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.message)
                    })
                    .catch(error => console.log(error))
                }
                //Redirigo a products
                window.location.href = URL_PRODUCTS
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            })
        }
    })
})
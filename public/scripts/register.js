const register = document.getElementById('register')
const acceptCookies = document.getElementById('acceptCookies')

register.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    if (acceptCookies.checked) {
        fetch(`/api/cookies/set/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
            })
            .catch(error => console.log(error))
    }
})

console.log(register)
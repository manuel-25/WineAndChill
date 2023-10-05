const submitButton = document.getElementById('submit')
const userDiv = document.getElementById('user-email')
const userEmail = userDiv.getAttribute('data-email')

submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value

    fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userEmail,
            password,
            confirmPassword
        })
    })
    .then(res => res.json())
    .then(data => {
        if(!data.success) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            })
        }
        if(data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: data.message,
                willClose: () => {
                    window.location.href = '/login';
                }
            })
        }
    })
})
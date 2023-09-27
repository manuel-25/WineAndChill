const editButton = document.getElementById('editButton')
const URL_PROFILE = '/profile'

editButton.addEventListener('click', (event) => {
    const email= document.getElementById('email').value
    const name = document.getElementById('name').value
    const age = document.getElementById('age').value
    const address = document.getElementById('address').value
    const phone = document.getElementById('phone').value

    fetch('/api/users/update/profile',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name, age, address, phone})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (!data.success) {
            Swal.fire({
                icon: 'error',
                title: 'Try Again',
                text: data.message || 'Error updating',
                confirmButtonText: 'OK'
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: data.message,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.href = URL_PROFILE
                }
            })
        }
    })
})
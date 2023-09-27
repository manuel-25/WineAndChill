const editButton = document.getElementById('editButton')
const emailInput= document.getElementById('email').value
const nameInput = document.getElementById('name').value
const ageInput = document.getElementById('age').value
const addressInput = document.getElementById('address').value
const phoneInput = document.getElementById('phone').value

console.log(emailInput, editButton, nameInput, ageInput, addressInput, phoneInput)


/*
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
        window.location.href = URL_PRODUCTS
    }
})*/
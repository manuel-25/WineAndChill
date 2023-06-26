const productForm = document.getElementById('productForm')

productForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const code = document.getElementById('code').value
    const stock = document.getElementById('stock').value
    const type = document.getElementById('type').value

    const formData = {
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
        type: type
    }

    fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Product ${data.response.id} created!`,
                confirmButtonText: 'OK',
                timer: 5000,
                timerProgressBar: true,
                onClose: () => {
                    console.log('Alerta cerrada')
                }
            }).then(() => {
                window.location.href = '/new_product'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.response,
                confirmButtonText: 'OK'
            })
        }
    })
    .catch(error => {
        console.error(error)
    })
})

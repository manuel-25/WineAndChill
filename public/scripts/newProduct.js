const productForm = document.getElementById('productForm')

productForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const status = document.getElementById('status').value
    const stock = document.getElementById('stock').value
    const type = document.getElementById('type').value
    const cellar = document.getElementById('cellar').value

    const imageInput = document.getElementById('thumbnail')
    const imageFile = imageInput.files[0]

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('status', status)
    formData.append('stock', stock)
    formData.append('type', type)
    formData.append('cellar', cellar)
    formData.append('thumbnail', imageFile)


    fetch('/api/products', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: data.response,
                confirmButtonText: 'OK',
                timerProgressBar: true,
                onClose: () => {
                    console.log('Alerta cerrada')
                }
            }).then(() => {
                window.location.href = '/new_product'
            })
        } else {
            console.log('data:', data)
            const displayError = data.message ?? data.error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: displayError,
                confirmButtonText: 'OK'
            })
        }
    })
    .catch(error => {
        console.error(error)
    })
})

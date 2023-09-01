function deleteProduct(event, productId) {
    event.preventDefault()
    
    Swal.fire({
        title: 'Confirmar eliminación',
        text: '¿Estás seguro de que deseas eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted',
                    text: data.response,
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = `/products`
                })
            })
        }
    })
}

function updateProduct(event, productId) {
    event.preventDefault()
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const status = document.getElementById('status').value
    const stock = document.getElementById('stock').value
    const type = document.getElementById('type').value
    const cellar = document.getElementById('cellar').value

    const formData = {
        title,
        description,
        price,
        status,
        stock,
        type,
        cellar
    }

    fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: data.response,
                confirmButtonText: 'OK',
                timerProgressBar: true,
            }).then(() => {
                window.location.href = `/update_product/${data.productId}`
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
}
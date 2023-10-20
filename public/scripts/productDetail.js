const submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    let quantityInput = document.getElementById('quantityInput'); 
    const productId = document.getElementById('productId');

    fetch(`/api/carts/cart/product/${productId.textContent}/${quantityInput.value}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product added to your cart!',
                    confirmButtonText: 'OK'
                })
                .then((result) => {
                    if(result.isConfirmed) window.location.reload()
                })
            } else {
                if(data.status) {
                    Swal.fire({
                        icon: 'error',
                        title: data.response || 'Error'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to add the product to the cart. Please try again.',
                    })
                }
            }
        })
})
const updateQuantity = async (productId) => {
    const cartId = '1000'
    const input = document.querySelector(`input[data-product-id="${productId}"]`);
    const quantity = Number(input.value);
    console.log(quantity)

    try {
      const response = await fetch(`/api/carts/${cartId}/product/${productId}/${quantity}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      console.log(response)
  
      //arreglar response.ok no siempre esta bien y actualiza mal
      if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Product Updated',
            text: response.statusText,
        }).then((res)=>{
            window.location.reload()
        })
      } else {
        console.error('Update error')
        Swal.fire({
            icon: 'error',
            title: 'Update Error',
            text: response.statusText,
        })
      }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Update Error',
            text: response.statusText,
        })
    }
}

// Función para eliminar un producto del carrito
async function deleteProduct(productId) {
    console.log('product id: ', productId)
    try {
      const response = await fetch(`/api/carts/1000/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Product Deleted',
          text: 'The product has been successfully deleted from the cart.',
        }).then(() => {
          window.location.reload()
        });
      } else {
        console.error('Delete error')
        Swal.fire({
          icon: 'error',
          title: 'Delete Error',
          text: response.statusText,
        })
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error)
      Swal.fire({
        icon: 'error',
        title: 'Delete Error',
        text: 'An error occurred while deleting the product from the cart.',
      })
    }
  }
  
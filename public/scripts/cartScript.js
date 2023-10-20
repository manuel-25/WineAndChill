document.addEventListener('DOMContentLoaded', () => {
  const updateButtons = document.querySelectorAll('.updateBtn');
  updateButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      updateQuantity(productId);
    });
  });

  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      deleteProduct(productId);
    });
  });
});

async function updateQuantity(productId) {
  const input = document.querySelector(`input[data-product-id="${productId}"]`);
  const quantity = Number(input.value);

  try {
    await fetch(`/api/carts/update/${productId}/${quantity}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Cart Updated',
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Update Error',
            text: data.response,
          });
        }
      });
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Update Error',
      text: error,
    });
  }
}

// Función para eliminar un producto del carrito
async function deleteProduct(productId) {
  try {
    console.log('delete click');
    await fetch(`/api/carts/delete/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Product Deleted',
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Delete Error',
            text: data.response,
          });
        }
      });
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Delete Error',
      text: error,
    });
  }
}
  
async function checkout() {
  await fetch('/api/carts/purchase', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Compra exitosa!',
          text: `Ticket id: ${data.payload.ticketId}`,
        }).then(() => {
          window.location.reload()
        })
      } else {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Error al realizar la compra',
          text: `${data.purchaseOrderId}`,
        })
      }
    })
}
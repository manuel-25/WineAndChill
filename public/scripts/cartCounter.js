const socket = io()
let cartBadge = document.getElementById('cartBadge')


socket.on('cartCounter', data => {
    cartBadge.textContent = data
})

let socket = io('http://localhost:8080', {
    transports: ['websocket'],
})
let cartBadge = document.getElementById('cartBadge')


socket.on('cartCounter', data => {
    cartBadge.textContent = data
})

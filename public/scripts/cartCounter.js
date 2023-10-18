const APP_URL = window.location.origin

let socket = io(APP_URL, {
    transports: ['websocket'],
})
let cartBadge = document.getElementById('cartBadge')


socket.on('cartCounter', data => {
    cartBadge.textContent = data
})

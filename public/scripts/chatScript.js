let socket = io()
let chatInput = document.getElementById('chatInput')
let chatBox = document.getElementById('messages')
let userName

Swal.fire({
    title: 'Username',
    input: 'text',
    inputValidator: (value) => !value && 'Please write your name',
    allowOutsideClick: false,
    allowEscapeKey: false,
}).then((res) => {
    userName = res.value
    socket.emit('chat_Auth', { userName })
})

//Mando el server los mensajes
chatInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault()
        let message = chatInput.value.trim()
        if(message){
            const currentTime = getCurrentTime()
            socket.emit('new_message', { userName, message, currentTime })
            chatInput.value = ''
        }
    }
})

//Renderizo los mensajes 
socket.on('allMessages', (data) => {
    renderMessages(data)
})

//Renderizo al cargar la pagina
window.addEventListener('load', () => {
    socket.emit('load_messages', 'hola')
    socket.on('allMessages', (data) => {
        renderMessages(data)
    })
})

function renderMessages(data) {
    chatBox.innerHTML = ''
    data.chatLog.forEach((chat) => {
      const messageElement = document.createElement('p')
      messageElement.classList.add('chatLine')
  
      const usernameElement = document.createElement('span')
      usernameElement.id = 'userNameTag'
      usernameElement.textContent = `${chat.userName}:`
      let userColor = chat.id ? data.usersLog.find(user => user.id === chat.id)?.color : null
      usernameElement.style.color = userColor
  
      const timeElement = document.createElement('span')
      timeElement.className = 'messageTime'
      timeElement.textContent = chat.currentTime
  
      const messageText = document.createTextNode(` ${chat.message}`)
  
      messageElement.appendChild(usernameElement)
      messageElement.appendChild(timeElement)
      messageElement.appendChild(messageText)
  
      chatBox.appendChild(messageElement)
    })
    chatBox.scrollTop = chatBox.scrollHeight //no funciona ??
}
  
function getCurrentTime() {
    const date = new Date()
    const currentHour = String(date.getHours()).padStart(2, '0')
    const currentMinute = String(date.getMinutes()).padStart(2, '0')
    const currentSecond = String(date.getSeconds()).padStart(2, '0')
    const currentTime = currentHour + ':' + currentMinute + ':' + currentSecond
    return currentTime
}
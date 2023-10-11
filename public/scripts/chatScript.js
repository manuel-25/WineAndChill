let socket = io('http://localhost:8080', {
    transports: ['websocket'],
})

let chatInput = document.getElementById('chatInput')
let chatBox = document.getElementById('messages')
let username
let color

//Primera conexion con socket recibo la data
socket.on('chatAuth', (data) => {
    username = data.username
})

socket.on('error', (error) => {
    console.error('Error en el servidor de socket:', error);
})

//Mando al server los mensajes
chatInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault()
        let message = chatInput.value.trim()
        if(message){
            const currentTime = getCurrentTime()
            socket.emit('new_message', { username, message, currentTime })
            chatInput.value = ''
        }
    }
})

//Renderizo
socket.on('allMessages', (data) => {
    if (data) {
        renderMessages(data)
    } else {
        console.error('Could not retrieve the messages')
    }
})

//Renderizo onload
window.addEventListener('load', () => {
    socket.on('allMessages', (data) => {
        if(data) {
            renderMessages(data)
        } else {
            console.error('Could not retrieve the messages')
        }
    })
})

async function renderMessages(data) {
    const chatArray = data.chatFromDB
    chatBox.innerHTML = ''
    chatArray.forEach((chat) => {
      const messageElement = document.createElement('p')
      messageElement.classList.add('chatLine')
  
      const usernameElement = document.createElement('span')
      usernameElement.socketId = 'userNameTag'
      usernameElement.textContent = `${chat.username}:`
      usernameElement.style.color = chat.color ? chat.color : '#000'
  
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
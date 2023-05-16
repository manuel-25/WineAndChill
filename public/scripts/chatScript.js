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
            socket.emit('new_message', { userName, message })
            chatInput.value = ''
        }
    }
})

//Renderizo los mensajes 
socket.on('allMessages', (data) => {
    chatBox.innerHTML = ''
  
    data.chatLog.forEach((chat) => {
      const messageElement = document.createElement('p')
      messageElement.style.marginBottom = '2px'
  
      const usernameElement = document.createElement('span')
      usernameElement.id = 'userNameTag'
      usernameElement.textContent = `${chat.userName}:`
      let userColor = chat.id ? data.usersLog.find(user => user.id === chat.id)?.color : null
      usernameElement.style.color = userColor
  
      const messageText = document.createTextNode(` ${chat.message}`)
  
      messageElement.appendChild(usernameElement)
      messageElement.appendChild(messageText)
      chatBox.appendChild(messageElement)
    })
  
    chatBox.scrollTop = chatBox.scrollHeight
  })
  

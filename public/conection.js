const socket = io()

socket.emit(
    'primera conexion',
    {
        name:'manuel',
        age:'29'
    }
)

socket.on(
    'contador',
    data => console.log(data)
)
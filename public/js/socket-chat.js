var socket = io()
var params = new URLSearchParams(window.location.search)

if (!params.has('username') || !params.has('chatName')) {
    window.location = 'index.html'
    throw new Error('The Username and the Chat name are required')
}
let data = {
    user: {
        name: params.get('username')
    },
    room: {
        name: params.get('chatName')
    }
}

socket.on('connect', function() {
    console.log('Connected')

    socket.emit('enterChat', data, function(res) {
        loadUsers(res.users)
    })

    socket.on('chatStatus', (data) => {
        loadUsers(data.users)
        addMessage(data)
    })

    socket.on('createMessage', (data) => {
        addMessage(data, false)
    })

    socket.on('createPrivateMessage', (data) => {
        console.log(data)
    })

})

socket.on('disconnect', function() {
    console.log('Disconnected')
})
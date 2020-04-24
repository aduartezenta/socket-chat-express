var socket = io();
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
    console.log('Connected');

    socket.emit('enterChat', data, function(res) {
        console.log(res);
    })

    socket.on('chatStatus', (data) => {
        console.log(data);
    })

    socket.on('createMessage', (data) => {
        console.log(data);
    })

    socket.on('createPrivateMessage', (data) => {
        console.log(data);
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected');
})
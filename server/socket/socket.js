const { io } = require('../server')
const { Users } = require('../classes/users')
const { createMessage, createChatStatus } = require('../utils/utils')

const users = new Users()

io.on('connection', (client) => {
    console.log('User connected')

    client.on('enterChat', (data, callback) => {
        if (!data.user.name || !data.room.name) {
            return callback({
                ok: false,
                err: {
                    message: 'The name and room are required'
                }
            })
        }

        // Join room
        client.join(data.room.name)

        let allUsers = users.addUser(client.id, data.user.name, data.room.name)
        let usersByRoom = users.getUserByRoom(data.room.name)
        callback({
            ok: true,
            users: usersByRoom
        })

        // Notify that use has join the room
        client.broadcast
            .to(data.room.name)
            .emit('chatStatus', createChatStatus(`${data.user.name} has joined the room`, usersByRoom))
    })

    client.on('createMessage', (data) => {
        let user = users.getUser(client.id)
        console.log(user);
        client.broadcast.to(user.room).emit('createMessage', createMessage(user.name, data.message))
    })

    client.on('createMessage', (data) => {
        console.log(data);
    })

    client.on('createPrivateMessage', (data) => {
        let user = users.getUser(client.id)
        console.log(user);
        client.broadcast.to(data.to).emit('createPrivateMessage', createMessage(user.name, data.message))
    })

    client.on('disconnect', () => {
        let user = users.deleteUser(client.id)
        console.log(`${user.name} disconnected`);

        // Notify that use has left the room
        client.broadcast
            .to(user.room)
            .emit('chatStatus', createChatStatus(`${user.name} has left the room`, users.getUserByRoom(user.room)))
    })

})
const createMessage = (username, message) => {
    return {
        username,
        message,
        date: new Date().getTime()
    }
}

const createChatStatus = (message, users) => {
    return {
        message,
        users,
        date: new Date().getTime()
    }
}

module.exports = {
    createMessage,
    createChatStatus
}
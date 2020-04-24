class Users {

    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        let user = {
            id,
            name,
            room
        }

        this.users.push(user)
        return this.users
    }

    getUser(id) {
        return this.users.find((user) => user.id === id)
    }

    getUsers() {
        return this.users
    }

    getUserByRoom(room) {
        return this.users.filter((user) => user.room === room)
    }

    deleteUser(id) {
        let userToDelete = this.getUser(id)
        this.users = this.users.filter((user) => user.id != id)
        return userToDelete
    }

}

module.exports = {
    Users
}
var params = new URLSearchParams(window.location.search)

var divUsers = $("#divUsers")
var formSendMessage = $("#formSendMessage")
var txtMessage = $("#txtMessage")
var divChatbox = $("#divChatbox")

function loadUsers(users) {
    var html = ''

    html += '<li>'
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('chatName') + '</span></a>';
    html += '</li>'

    for (var i = 0; i < users.length; i++) {
        html += '<li>'
        html += '    <a data-id="' + users[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>"' + users[i].name + '"<small class="text-success">online</small></span></a>'
        html += '</li>'
    }

    divUsers.html(html)
}

function addMessage(data, isFromMe) {
    var html = ''
    var date = new Date(data.date)
    var hour = date.getHours() + ':' + date.getMinutes()

    if (isFromMe) {
        html += '<li class="reverse">'
        html += '    <div class="chat-content">'
        html += '        <h5>' + data.username + '</h5>'
        html += '        <div class="box bg-light-inverse">' + data.message + '</div>'
        html += '    </div>'
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '    <div class="chat-time">' + hour + '</div>'
        html += '</li>'
    } else {
        if (data.username) {
            html += '<li class="animated fadeIn">'
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
            html += '    <div class="chat-content">'
            html += '        <h5>' + data.username + '</h5>'
            html += '        <div class="box bg-light-info">' + data.message + '</div>'
            html += '    </div>'
            html += '    <div class="chat-time">' + hour + '</div>'
            html += '</li>'
        } else {
            html += '<li class="animated fadeIn">'
            html += '    <div class="chat-content">'
            html += '        <div class="box bg-light-danger">' + data.message + '</div>'
            html += '    </div>'
            html += '    <div class="chat-time">' + hour + '</div>'
            html += '</li>'
        }
    }
    divChatbox.append(html)
    scrollBottom()
}

function scrollBottom() {
    // selectors
    var newMessage = divChatbox.children('li:last-child')

    // heights
    var clientHeight = divChatbox.prop('clientHeight')
    var scrollTop = divChatbox.prop('scrollTop')
    var scrollHeight = divChatbox.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight()
    var lastMessageHeight = newMessage.prev().innerHeight() || 0

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight)
    }
}

// Listeners
divUsers.on('click', 'a', function() {
    let id = $(this).data('id')
    if (id) {
        console.log(id);
    }
})

formSendMessage.on('submit', function(e) {
    e.preventDefault()
    let message = txtMessage.val()
    if (message.trim().length === 0) return

    socket.emit('createMessage', {
        message
    }, (data) => {
        if (data) {
            txtMessage.val('').focus()
            addMessage(data, true)
        }
    })
})
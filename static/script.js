const socket = io();
const form = document.getElementById('form');
const messages = document.getElementById('messages');
const input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.value){
        socket.emit('new_message', input.value);
        input.value = '';
    }
});

socket.on('all_messages', function(msgArray){
    msgArray.forEach(msg => {
        let item = document.createElement('li');
        item.textContent = msg.login + ': ' + msg.content;
        messages.apppendChild(item)
    })
})

socket.on('message', function(msg){
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

})

function changeNickName(){
    let nickName = prompt('Choose your nickname');
    if (nickname){
        socket.emit('set_nickname',nickname)
    }
}

changeNickName();
var socket = io.connect();

var form = document.getElementById('form');
var input = document.getElementById('message-box');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
    }
});

socket.on('chat message', function(msg) { //recieved message??
    var bubble = document.createElement('div');
    var item = document.createElement('li');
    bubble.classList.add("speech-bubble");
    bubble.appendChild(item);
    // bubble.textContent = msg;
    item.textContent = msg;
    messages.appendChild(bubble);
    window.scrollTo(0, document.body.scrollHeight);
});
// get username and room from URL
const { username, roomCode } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

var form = document.getElementById('form');
var input = document.getElementById('message-box');

var socket = io.connect();

// Join room
socket.emit('joinRoom', { username, roomCode });

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
    }
});

socket.on('chat message', function(msg) { //recieved message
    var bubble = document.createElement('div');
    bubble.classList.add("speech-bubble");
    bubble.innerHTML = `<p style='color:${msg.color}'>${msg.username}</p><ul>${msg.text}</ul>`//<p class="time">at ${msg.time}</p>
    messages.appendChild(bubble);
    messages.scrollTo(0, document.body.scrollHeight);
});
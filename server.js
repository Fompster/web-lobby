// const path = require('path');
// const http = require('http');
// const express = require('express');
// const socketio = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);
// // const io = WebSocket("ws://localhost:3000");

// // Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Run when a client connects
// io.on('connection', socket => {
//     console.log('A new user has joined');
// });

const path = require('path');
const PORT = 3000 || process.env.PORT;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Public/index.html');
});
// app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {  
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`);
        io.emit('chat message', msg); //sending it to everyone
    });

});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
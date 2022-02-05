const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const formatMessage = require('./public/Javascript/format-message');

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    
    socket.on('joinRoom', ({ username, roomCode }) => {
        socket.on('chat message', (msg) => {
            io.emit('chat message', formatMessage(username, msg)); //sending it to everyone
        });

    });


    socket.on('move mouse', (mouseData) => {
        // socket.broadcast.emit('move mouse', mouseData); //sending it to everyone but the user who sent
        io.emit('move mouse', mouseData);
    });

    // when user disconnects
    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    // socket.onAny((event, ...args) => {  console.log(event, args);}); //prints any event that happens to the client
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
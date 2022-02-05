const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const formatMessage = require('./Public/JavaScript/format-message');
const { joinUser, getUser } = require('./Public/JavaScript/users');

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, roomCode }) => {
        const user = joinUser(socket.id, username, roomCode);
        socket.join(user.roomCode);

        socket.broadcast.to(user.roomCode).emit('chat message', formatMessage("Bot", `${user.username} has clicked in`));
    });

    socket.on('chat message', (msg) => {
        const user = getUser(socket.id);
        io.to(user.roomCode).emit('chat message', formatMessage(user.username, msg)); //sending it to everyone in the room
    });

    socket.on('move mouse', (mouseData) => {
        // socket.broadcast.emit('move mouse', mouseData); //sending it to everyone but the user who sent
        io.emit('move mouse', mouseData);
    });

    // when user disconnects
    socket.on('disconnect', () => {
        // const user = getUser(socket.id);
        socket.broadcast.emit('chat message', formatMessage("Bot", `user has disconnected`));
    });

    // socket.onAny((event, ...args) => {  console.log(event, args);}); //prints any event that happens to the client
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
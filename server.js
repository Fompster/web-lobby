const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const formatMessage = require('./Public/JavaScript/format-message');
const { joinUser, getUser, removeUser } = require('./Public/JavaScript/users');
const bot = {username: "Bot", color: "#808080"};

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, roomCode }) => {
        const user = joinUser(socket.id, username, roomCode);
        socket.join(user.roomCode);

        io.to(user.id).emit('send room data', user.userColor);
        socket.broadcast.to(user.roomCode).emit('chat message', formatMessage(bot.username, `${user.username} has clicked in`, color = bot.color));
    });

    socket.on('chat message', (msg) => {
        const user = getUser(socket.id);
        io.to(user.roomCode).emit('chat message', formatMessage(user.username, msg, color = user.userColor)); //sending it to everyone in the room
    });

    socket.on('move mouse', (mouseData) => {
        const user = getUser(socket.id);
        let data = {x: mouseData.x, y: mouseData.y, color: user.userColor};

        socket.broadcast.emit('move mouse', data); //sending it to everyone but the user who sent
        // io.to(user.roomCode).emit('move mouse', data);
    });

    // when user disconnects
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.roomCode).emit('chat message', formatMessage(bot.username, `${user.username} has disconnected`, color = bot.color));
        }
    });

    // socket.onAny((event, ...args) => {  console.log(event, args);}); //prints any event that happens to the client
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
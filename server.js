// Stuff for server
const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const formatMessage = require('./Public/JavaScript/format-message');
const { joinUser, getUser, removeUser, getRoomUsers } = require('./Public/JavaScript/users');
const bot = { username: "Bot", color: "#808080" };

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, roomCode }) => {
        const user = joinUser(socket.id, username, roomCode);
        socket.join(user.roomCode);

        io.to(user.id).emit('room info', {
            users: getRoomUsers(roomCode),
            user: user.id,
        });

        // Send message that a player has joined
        socket.broadcast.to(user.roomCode).emit(
            'chat message',
            formatMessage(bot.username, `${user.username} has clicked in`, color = bot.color));
        
        // send the new user that joined
        socket.broadcast.to(user.roomCode).emit(
            'update room users', {
            newUser: user,
        });
    });

    socket.on('chat message', (msg) => {
        const user = getUser(socket.id);
        //sending it to everyone in the room
        io.to(user.roomCode).emit(
            'chat message', 
            formatMessage(user.username, msg, color = user.userColor)); 
    });

    socket.on('move mouse', (mouseData) => {
        const user = getUser(socket.id);
        let data = { x: mouseData.x, y: mouseData.y, userId: user.id };

        //sending it to everyone but the user who sent TODO everyone on all channels???
        socket.broadcast.emit('move mouse', data); 
    });

    // when user disconnects
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.roomCode).emit(
                'chat message', 
                formatMessage(bot.username, `${user.username} has disconnected`, color = bot.color));
        }

        // remove the user
        socket.broadcast.to(user.roomCode).emit(
            'update room users', {
            disconnectedUser: user,
        });
        
    });

    // socket.onAny((event, ...args) => {  console.log(event, args);}); //prints any event that happens to the client
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
// var dm = require('./Public/JavaScript/draw-canvas');

const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {  
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); //sending it to everyone
    });

    socket.on('click mouse', (mouseData) => {
        io.emit('click mouse', mouseData); //sending it to everyone
    });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {  res.send('./index.html');});
io.on('connection', (socket) => {  console.log('a user connected');});
server.listen(5501, () => {  console.log('listening on *:5501');});
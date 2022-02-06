import { drawMouse } from "./draw-mouse.js";

var canvas = document.getElementById('mouse-canvas');
var context = canvas.getContext("2d");
let roomUsers = [];
let clientUserId;

// sent once on join
socket.on('room info', function(info) {
    roomUsers = info.users;
    clientUserId = info.user;

    // place client last in list so that it will be rendered on top of others
    let index = roomUsers.findIndex(user => user.id === clientUserId);
    let user = roomUsers.splice(index, 1)[0];
    roomUsers.push(user);

    drawMouse(context, canvas, roomUsers);
});

socket.on('update room users', function(users) {
    if (users.newUser) {
        roomUsers.unshift(users.newUser);
    } else {
        index = roomUsers.findIndex(user => user.id === users.disconnectedUser.id);
        if (index != -1) {
            roomUsers.splice(index, 1);
        }
    }
});

canvas.addEventListener('mousemove', function(e) {
    socket.emit('move mouse', { x: e.layerX, y: e.layerY });

    // update own position since we are not recieving it through the server
    let index = roomUsers.findIndex(user => user.id === clientUserId);
    roomUsers[index].posX = e.layerX;
    roomUsers[index].posY = e.layerY;
});

socket.on('move mouse', function(mouseData) {
    let index = roomUsers.findIndex(user => user.id === mouseData.userId);
    roomUsers[index].posX = mouseData.x;
    roomUsers[index].posY = mouseData.y;
});
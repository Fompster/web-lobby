import { drawMouse } from "./draw-mouse.js";

var canvas = document.getElementById('mouse-canvas');
var context = canvas.getContext("2d");
let roomUsers = [];
let clientUserId;

// sent once on join
socket.on('room info', function(info) {
    roomUsers = info.users;
    clientUserId = info.user;
    drawMouse(context, canvas, roomUsers);
});

socket.on('update room users', function(users) {
    if (users.newUser) {
        console.log(users)
        roomUsers.push(users.newUser);
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

// function drawMouse(context, canvas) {

//     function loopUsers() {
//         context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//         for (let i in roomUsers){
//             draw(context, roomUsers[i]);
//         };
//         window.requestAnimationFrame(loopUsers);
//     }

//     function draw(context, user){
//         context.lineWidth = 3;
//         context.strokeStyle = "#808080";
//         context.fillStyle = user.userColor;
//         context.beginPath();
//         context.arc(user.posX - 3*mouseRadius, user.posY - 3*mouseRadius, mouseRadius, 0, 2 * Math.PI, false);
//         context.closePath();
//         context.fill();
//         context.stroke(); 
//     }

//     loopUsers();
// }
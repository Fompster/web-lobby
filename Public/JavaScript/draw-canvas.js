var canvas = document.getElementById('mouse-canvas');
var context = canvas.getContext("2d");
var clientColor;
let userPositions = [];
const mouseRadius = 7;

socket.on('send room data', function(color) {
    clientColor = color;
});

canvas.addEventListener('mousemove', function(e) {
    socket.emit('move mouse', { x: e.layerX, y: e.layerY });
    drawMouse(e.layerX, e.layerY, context, clientColor);
});

socket.on('move mouse', function(mouseData) {
    drawMouse(mouseData.x, mouseData.y, context, mouseData.color);
});

function drawMouse(x, y, context, color) {

    function draw(){
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        context.lineWidth = 3;
        context.strokeStyle = "#808080";
        context.fillStyle = color;
        context.beginPath();
        context.arc(x - 3*mouseRadius, y - 3*mouseRadius, mouseRadius, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
        context.stroke(); 
    }

window.requestAnimationFrame(draw);
}
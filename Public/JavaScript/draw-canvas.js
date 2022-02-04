var canvas = document.getElementById('mouse-canvas');
var context = canvas.getContext("2d");
const mouseRadius = 7;

canvas.addEventListener('mousemove', function(e) {
socket.emit('move mouse', { x: e.layerX, y: e.layerY});
});

socket.on('move mouse', function(mouseData) {
drawMouse(mouseData.x, mouseData.y, context);
});

function drawMouse(x, y, context) {
function draw(){
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.lineWidth = 3;
    context.strokeStyle = "#808080";
    context.beginPath();
    context.arc(x - 3*mouseRadius, y - 3*mouseRadius, mouseRadius, 0, 2 * Math.PI, false);
    context.closePath();
    context.stroke(); 
}

window.requestAnimationFrame(draw);
}
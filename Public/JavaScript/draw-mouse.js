const mouseRadius = 7;
const colors = {"#5cb85c": "#449d44", "#d9534f": "#e7908e", "#5567db": "#949fe8"};

export function drawMouse(context, canvas, roomUsers) {

    function loopUsers() {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        for (let i in roomUsers){
            draw(context, roomUsers[i]);
        };
        window.requestAnimationFrame(loopUsers);
    }

    function draw(context, user){
        context.lineWidth = 3;
        context.strokeStyle = colors[user.userColor];
        context.fillStyle = user.userColor;
        context.beginPath();
        context.arc(user.posX - 3*mouseRadius, user.posY - 3*mouseRadius, mouseRadius, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
        context.stroke(); 
    }

    loopUsers();
}
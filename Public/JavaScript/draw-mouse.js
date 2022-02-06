const mouseRadius = 7;

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
        context.strokeStyle = "#808080";
        context.fillStyle = user.userColor;
        context.beginPath();
        context.arc(user.posX - 3*mouseRadius, user.posY - 3*mouseRadius, mouseRadius, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
        context.stroke(); 
    }

    loopUsers();
}
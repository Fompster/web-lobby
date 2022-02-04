exports.drawMouse = function (x,y, context) {
    context.clearRect(0, 0, 200, 200); // max.x max.y

    function draw(){
        context.lineWidth = 3;
        context.strokeStyle = "#808080";
        context.beginPath();
        context.arc(x, y, 20, 0, 2 * Math.PI, false);
        context.closePath();
        context.stroke();

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
}; 
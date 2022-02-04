var canvas = document.getElementById("mouse-canvas");
var chatBox = document.getElementById("chat-box");
function sizeCanvas() {
var parentCssProperties = window.getComputedStyle(canvas.parentElement, null);
var paddingHorizontal = parseInt(parentCssProperties.getPropertyValue('padding-left')) + parseInt(parentCssProperties.getPropertyValue('padding-right'));
var paddingVertical = parseInt(parentCssProperties.getPropertyValue('padding-top')) + parseInt(parentCssProperties.getPropertyValue('padding-bottom'));

canvas.width  = canvas.parentElement.clientWidth - paddingHorizontal - chatBox.clientWidth - chatBox.clientLeft - 2*canvas.clientLeft - 1;
canvas.height = canvas.parentElement.clientHeight - paddingVertical;
}
window.addEventListener('resize', sizeCanvas);
sizeCanvas();
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import canvasPresets from '../utils'

const container = ref(null);
const canvas = ref(null);
var ctx = null;
var canvasWidth = ref(500);
var canvasHeight = ref(500);
var gridWidth = ref(1);
var gridColorHex = ref("#ffffff");
var gridOpacity = ref(40);
var gridSize = ref("1/3");
var image = new Image();
var imageXPos = 0;
var imageYPos = 0;
var imageWidth = 100;
var imageHeight = 100;
var startX = 0;
var startY = 0;
var scale = ref(1.0);
var isMouseDown = false;


onMounted(() => {
  ctx = canvas.value.getContext('2d');

  resizeCanvas();

  loadImage(ctx);
  //window.addEventListener("resize", resizeCanvas);
});

function loadImage(ctx) {
  image.src = '/src/assets/castle.jpg';
  image.onload = () => {
    var width = image.width;
    var height = image.height;
    var ratio = Math.min(canvasWidth.value / width, canvasHeight.value / height);
    imageWidth = width * ratio;
    imageHeight = height * ratio;

    drawImage();
    drawGrid();
  }
}

function drawImage() {
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

  ctx.save();

  //ctx.scale(scale.value, scale.value);

  ctx.drawImage(image, imageXPos, imageYPos, imageWidth, imageHeight);

  ctx.restore();
}

function drawGrid(){
  ctx.save();

  let numOfLinesWidth =  pixelsTo(gridSize.value, canvasWidth.value);
  let numOfLinesHeight =  pixelsTo(gridSize.value, canvasHeight.value);

  let color = changeGridColor(gridColorHex.value, gridOpacity.value);

  // Draw Horizontal Grid lines
  for (let i = 1; i < numOfLinesWidth; i++) { 
    // drawLine(position-X, position-Y, Width, Height, Color);
    // Divide the width of the canvas by the number of lines 
    // Then multiply it by which line it is on the grid
    drawLine((canvasWidth.value / numOfLinesWidth) * i, 0, gridWidth.value, canvasHeight.value, color); 
  }

  // Draw Vertical Grid lines
  for (let i = 1; i < numOfLinesHeight; i++) {
    drawLine(0, (canvasHeight.value / numOfLinesHeight) * i, canvasWidth.value, gridWidth.value, color);
  }

  // Draw border
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1; 
  ctx.rect(1, 1, canvasWidth.value-1, canvasHeight.value-1);
  ctx.stroke();

  ctx.restore();
}

function drawLine(x, y, w, h, color){    
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
}

function pixelsTo(conversion, px){
  let retunValue;

switch(conversion) {
  case "1":
  retunValue = 96; // 1"
    break;
    case "1/2":
  retunValue = 48; // 1/2"
    break;
    case "1/3":
  retunValue = 32; // 1/3"
    break;
    case "1/4":
  retunValue = 24; // 1/4"
    break;
    case "1/8":
  retunValue = 12; // 1/8"
    break;
    case "1/16":
  retunValue = 6; // 1/16"
    break;

  default:
  retunValue = 96; // 1"
} 

return px / retunValue;
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function changeGridColor(hexNum, opacity){
  
  let RGB = hexToRgb(hexNum);
  let alpha =  opacity / 100;

  return "rgba(" + RGB.r + "," + RGB.g + "," + RGB.b + "," + alpha + ")";
}
console.log(changeGridColor("#fff", 50))



async function resizeCanvas() {
  await nextTick();
  //console.log(container.value.offsetWidth);
  canvasWidth.value = container.value.offsetWidth;
  canvasHeight.value = container.value.offsetHeight;
  //drawImage(ctx);
}

function onMouseUp(e) {
  isMouseDown = false;
}

function onMouseDown(e) {
  var mouse = getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas.value);
  if (isCursorOverImage(mouse.x, mouse.y)) {
    console.log('true');
    startX = mouse.x;
    startY = mouse.y;
    isMouseDown = true;
  }
}

function onMouseMove(e) {
  if (isMouseDown) {
    var mouse = getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas.value);

    const dx = mouse.x - startX;
    const dy = mouse.y - startY;
    startX = mouse.x;
    startY = mouse.y;
    imageXPos = imageXPos + dx; 
    imageYPos = imageYPos + dy;

    drawImage();
    drawGrid();
  }
}

function getRelativeMousePosition(event, target) {
  target = target || event.target;
  var rect = target.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

// assumes target or event.target is canvas
function getNoPaddingNoBorderCanvasRelativeMousePosition(event, target) {
  target = target || event.target;
  var pos = getRelativeMousePosition(event, target);

  pos.x = pos.x * target.width  / canvas.value.clientWidth;
  pos.y = pos.y * target.height / canvas.value.clientHeight;

  return pos;  
}

function isCursorOverImage(x, y) {
  return (x - canvas.value.offsetLeft) > imageXPos && (x - canvas.value.offsetLeft) < imageXPos + imageWidth
        && (y - canvas.value.offsetTop) > imageYPos && (y - canvas.value.offsetTop) < imageYPos + imageHeight;
}

function onChangeColor(e) {
  gridColorHex.value = e.currentTarget.value;
  drawImage();
  drawGrid();
}

function onChangeOpacity(e) {
  gridOpacity.value = e.currentTarget.value;
  drawImage();
  drawGrid();
}
</script>

<template>
  <main class="w-full h-screen">

    <div  class="flex flex-stretch flex-row w-full h-full">
      <div class="flex flex-row flex-grow flex-stretch p-4 w-full h-full">
        <!-- Sidebar -->
        <div class="flex flex-col flex-grow bg-dark-700 w-1/5 py-4 px-5 rounded-md mt-8">
          <p class="text-white uppercase font-medium mb-3">Grid</p>
          <div class="inline-flex items-center bg-dark-900 text-gray-300 px-2 py-1 rounded-md">
            <input class="w-5 h-5 bg-white rounded-md border-none" type="color" :value="gridColorHex" @input="onChangeColor">
            <span class="ml-2">{{gridColorHex}}</span>
          </div>
          <input ref="slider" type="range" min="1" max="100" :value="gridOpacity" class="mt-3" @input="onChangeOpacity">
        </div>
        <!-- Canvas -->
        <div ref="container" class="w-4/5 ml-4">
          <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"></canvas>
        </div>

      </div>
    </div>

  </main>
</template>

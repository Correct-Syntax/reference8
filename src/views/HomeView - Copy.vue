<script setup>
import { ref, onMounted, nextTick } from 'vue'

const container = ref(null);
const canvas = ref(null);
var ctx = null;
var canvasWidth = 500;
var canvasHeight = 500;
var image = new Image();
var imageXPos = 0;
var imageYPos = 0;
var imageWidth = 100;
var imageHeight = 100;
var startX = 0;
var startY = 0;
var isMouseDown = false;


onMounted(() => {
  ctx = canvas.value.getContext('2d');
  // canvasWidth = container.value.offsetWidth;
  // canvasHeight = container.value.offsetWidth;

  // ctx.beginPath();
  // ctx.strokeStyle = "red"
  // ctx.rect(20, 20, 150, 100);
  // ctx.stroke();

  loadImage(ctx);

  // window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
});

function loadImage(ctx) {
  image.src = '/src/assets/d.jpg';
  image.onload = () => {
    imageWidth = image.width/5;
    imageHeight = image.height/5;
    // console.log(imageHeight)
    drawImage(ctx);
  }
}

function drawImage() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(image, imageXPos, imageYPos, imageWidth, imageHeight);
}

async function resizeCanvas() {
  await nextTick();
  //console.log(container.value.offsetWidth);
  canvasWidth = container.value.offsetWidth;
  canvasHeight = container.value.offsetWidth;
}


function onMouseUp(e) {
  isMouseDown = false;
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


function onMouseDown(e) {
  var mouse = getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas.value);
  console.log(mouse)

  if (isCursorOverImage(mouse.x, mouse.y)) {
    console.log('true');
    startX = mouse.x;
    startY = mouse.y;
    isMouseDown = true;
  }
  //drawImage();
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
  }
}


function isCursorOverImage(x, y) {
  return (x - canvas.value.offsetLeft) > imageXPos && (x - canvas.value.offsetLeft) < imageXPos + imageWidth
        && (y - canvas.value.offsetTop) > imageYPos && (y - canvas.value.offsetTop) < imageYPos + imageHeight;
}
</script>

<template>
  <main class="relative bg-dark-800 h-screen">
    <!-- <TheWelcome /> -->

    <div ref="container" class="flex flex-col w-100 h-100 border border-blue-500">
      <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"></canvas>
    </div>

  </main>
</template>

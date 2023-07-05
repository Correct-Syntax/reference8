<script setup>
import { ref, onMounted, nextTick } from 'vue'

const container = ref(null);
const canvas = ref(null);
var ctx = null;
var canvasWidth = ref(500);
var canvasHeight = ref(500);
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

    drawImage(ctx);
  }
}

function drawImage() {
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

  ctx.save();

  ctx.scale(scale.value, scale.value);

  ctx.drawImage(image, imageXPos, imageYPos, imageWidth, imageHeight);

  ctx.beginPath();
  ctx.strokeStyle = "red"
  ctx.rect(0, 0, canvasWidth.value, canvasHeight.value);
  ctx.stroke();

  ctx.restore();
}

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

function onSlider(e) {
  scale.value = (e.currentTarget.value * 0.1);
  console.log(scale.value);
  
  drawImage();
}
</script>

<template>
  <main class="">

    <div ref="container" class="flex flex-stretch flex-row w-100 h-100">
      <div class="flex flex-row w-100 h-100">
        <div class="w-1/4 py-10 px-2">
          <input ref="slider" type="range" min="1" max="10" value="500" class="slider" @input="onSlider">
        </div>
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"></canvas>

      </div>
    </div>

  </main>
</template>

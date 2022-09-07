<template>
  <canvas ref="canvas" id="canvas" class="mt-5"></canvas>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue'

let canvas = ref('canvas');

const drawGraph = (dataPoints, verticalMaxValue, verticalStep, hoursBack, hoursStep, dataStep) => {
  canvas.value.width = canvas.value.clientWidth;
  canvas.value.height = canvas.value.clientHeight;

  let ctx = canvas.value.getContext('2d');

  const width = canvas.value.width;
  const height = canvas.value.height;
  const padding = 30;

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#d1d1d1";
  ctx.fillStyle = "#393838";

  const numberOfHorizontalGridLines = Math.floor(verticalMaxValue / verticalStep);
  const spacingBetweenHorizontalGridLines = (height - 2*padding) / (numberOfHorizontalGridLines);
  for (let i = 0; i <= numberOfHorizontalGridLines; i++) {
    let y = (i * spacingBetweenHorizontalGridLines) + padding + 0.5;
    ctx.moveTo(padding, y);
    ctx.lineTo(width, y);
    if (i < numberOfHorizontalGridLines) {
      let text = verticalMaxValue - i*verticalStep;
      let textWidth = ctx.measureText(text).width;
      ctx.fillText(text, (padding - textWidth) / 2, y);
    }

  }

  const numberOfVerticalGridLines = Math.floor(hoursBack / hoursStep);
  const spacingBetweenVerticalGridLines = (width - 2*padding) / (numberOfVerticalGridLines);
  const currentHour24 = new Date().getHours();

  // Draw the graph
  for (let i = 0; i <= numberOfVerticalGridLines; i++) {

    // Draws the reference line
    let x = i * spacingBetweenVerticalGridLines + padding + 0.5;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height - padding);

    // Label the reference line
    let pastHour24 = currentHour24 - (numberOfVerticalGridLines - i) * hoursStep;
    if (pastHour24 < 0) {
      pastHour24 += 24;
    }
    let pastHour12;
    if (pastHour24 > 12) {
      pastHour12 = pastHour24 - 12
      pastHour12 += " pm";
    } else if (pastHour24 === 12) {
      pastHour12 = pastHour24;
      pastHour12 += " pm";
    } else {
      pastHour12 = pastHour24;
      if (pastHour12 === 0) {
        pastHour12 += 12;
      }
      pastHour12 += " am";
    }
    const textWidth = ctx.measureText(pastHour12).width;
    ctx.fillText(pastHour12, x - textWidth / 2, height - padding / 2);

  }

  // Draw the data as a line graph
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();

  ctx.strokeStyle = "#000000"
  const scale = spacingBetweenHorizontalGridLines / verticalStep;

  for (let i = 0; i < dataPoints.length; i++) {

    //let x = (maxDataPoints - i) * (spacingBetweenVerticalGridLines / 4) + padding + 0.5;
    let graphWidth = (numberOfVerticalGridLines - 1) * spacingBetweenVerticalGridLines;
    let x = (graphWidth + padding) - (((dataStep / hoursStep) * spacingBetweenVerticalGridLines) * i) + 0.5;
    let y = (height - padding) - (dataPoints[dataPoints.length - i - 1] * scale) + 0.5;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

  }
  ctx.stroke();
  ctx.closePath();
}

const props = defineProps({
  dataPoints: Array,
  verticalMaxValue: Number,
  verticalStep: Number,
  hoursBack: Number,
  hoursStep: Number,
  dataStep: Number
})

onMounted(() => {
  drawGraph(props.dataPoints, props.verticalMaxValue, props.verticalStep, props.hoursBack, props.hoursStep, props.dataStep);
});

watch(props, (oldProps, newProps) => {
  drawGraph(newProps.dataPoints, newProps.verticalMaxValue, newProps.verticalStep, newProps.hoursBack, newProps.hoursStep, newProps.dataStep);
})


</script>

<style scoped>
canvas#canvas {
  aspect-ratio: 5/ 3;
  width: 90%;
}
</style>
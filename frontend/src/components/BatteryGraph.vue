<template>
  <BaseCard class="has-text-centered">
    <div>Battery Percentage</div>
    <div class="columns">
      <div class="column is-11 is-flex-grow-0 is-flex-shrink-1">
        <BaseGraph :dataPoints="socs" :verticalStep="25" :verticalMaxValue="100" :hoursBack="hoursBack"
          :hoursStep="hoursStep" :dataStep="0.5"></BaseGraph>
      </div>
      <div class="column is-flex-grow-0 is-flex-shrink-1">
        <button class="button is-block is-fullwidth" @click="zoomIn()">+</button>
        <button class="button is-block is-fullwidth" @click="zoomOut()">-</button>
      </div>
    </div>


  </BaseCard>
</template>

<script setup>
import BaseCard from './BaseCard.vue'
import BaseGraph from './BaseGraph.vue';
import {ref} from 'vue'
import { useAPI } from '../hooks/useAPI'
const { fetchSOCHistory } = useAPI();

const socs = ref([]);
const getSocs = async () => {
  socs.value = await fetchSOCHistory();
}
getSocs();

let hoursStep = ref(4);
let hoursBack = ref(24);

const zoomIn = () => {
  if (hoursStep.value != 1) {
    hoursStep.value -= 1;
    hoursBack.value -= 5;
  }
}

const zoomOut = () => {
  if (hoursStep.value != 4) {
    hoursStep.value += 1;
    hoursBack.value += 5;
  }
}


</script>
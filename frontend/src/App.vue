<template>
  <LiveStatsHeader />
  <div class="container" id="cards-container">
    <div class="columns">
      <div class="column">
        <BatteryGraph />
      </div>
      <div class="column">
        <LoadCard></LoadCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import BatteryGraph from './components/BatteryGraph.vue'
import LiveStatsHeader from './components/LiveStatsHeader.vue'
import LoadCard from "./components/LoadCard.vue"
import {useAPI} from './hooks/useAPI'

const { updateLiveStats } = useAPI();
setInterval(updateLiveStats, 1000);

</script>

<style scoped>
#cards-container {
  margin-top: -40px;
  width: 80%;
}
</style>

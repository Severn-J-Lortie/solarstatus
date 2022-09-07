<template>

  <BaseCard>
    <div class="columns is-vcentered is-centered">
      <div class="column is-flex-grow-0 is-flex-shrink-1" style="flex-basis: auto;">
        <ion-icon name="bulb-outline" id="lightbulb-icon" class="lightbulb-icon-on"></ion-icon>
      </div>
      <div class="column is-flex-grow-0 is-flex-shrink-1" style="flex-basis: auto;">
        <div> Load Power: {{liveStats.loadPower}} W </div>
        <button class="button mt-4 is-small">Turn off</button>
      </div>
    </div>
  </BaseCard>

</template>

<script setup>
import BaseCard from "./BaseCard.vue"
import { useAPI } from '../hooks/useAPI'

const { liveStats } = useAPI();

</script>

<style scoped>
#lightbulb-icon {
  font-size: 84px;
}

.lightbulb-icon-on {
  color: rgba(0, 212, 255, 1);
}
</style>
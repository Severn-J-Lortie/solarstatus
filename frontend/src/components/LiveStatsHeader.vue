<template>
  <section class="hero is-medium is-link has-text-centered" id="header-gradient">
    <div class="hero-body">
      <div class="container" style="width: 60%">
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>

              <p class="heading is-size-6">Battery SOC</p>
              <p class="title is-size-2">{{liveStats.batterySOC}}%</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">PV Power</p>
              <p class="title is-size-2">{{liveStats.solarPanelPower}} W</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">Charging Mode</p>
              <p class="title is-size-2">{{chargingMode}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">Battery Voltage</p>
              <p class="title is-size-2">{{liveStats.batteryVoltage}} V</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useAPI } from '../hooks/useAPI'

const {liveStats} = useAPI();
const chargingMode = computed(() => {
  if (liveStats.currentChargeMode == 0) return 'Not charging';
  if (liveStats.currentChargeMode == 1) return 'Float';
  if (liveStats.currentChargeMode == 2) return 'Boost';
  if (liveStats.currentChargeMode == 3) return 'Equalization'
})

</script>

<style scoped>
#header-gradient {
background: rgb(73,94,198);
background: linear-gradient(58deg, rgba(73,94,198,1) 0%, rgba(73,94,195,1) 30%, rgba(0,212,255,1) 100%);
}
</style>

import {reactive} from 'vue';

const liveStats = reactive({
  batterySOC: 0,
  solarPanelPower: 0,
  currentChargeMode: 0,
  batteryVoltage: 0,
  temperature: 0,
  loadPower: 0
});

export const useAPI = () => {

  const updateLiveStats = async () => {
    const response = await fetch("http://192.168.0.160:8080/realtime");
    const responseJSON = await response.json();
    Object.assign(liveStats, responseJSON);
  }

  const fetchSOCHistory = async () => {
    const response = await fetch("http://192.168.0.160:8080/soc");
    const responseJSON = await response.json();
    return responseJSON.batterySOCs;
  }

  return {
    liveStats,
    updateLiveStats,
    fetchSOCHistory
  }

};


import {reactive} from 'vue';

const liveStats = reactive({
  batterySOC: 42,
  solarPanelPower: 100,
  currentChargeMode: 1,
  batteryVoltage: 12.3,
  temperature: 25,
  loadPower: 10
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

import { createApp } from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'

const app = createApp(App);
app.config.ignoredElements = [/^ion-/];
app.mount("#app");
import { createApp } from "vue";
import { createPinia } from 'pinia'
import { io } from "socket.io-client";
import App from "./App.vue";

const app = createApp(App);

// app.config.globalProperties.$socket = io("http://localhost:5000", {
//   transports: ["websocket"],
// });
const pinia = createPinia(app);
app.use(pinia);
app.mount("#app");

import { defineStore } from "pinia";
import { ref } from "vue";
import { io } from "socket.io-client";

export const useGlobalStore = defineStore("global", () => {
  // Global socket
  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  });

  const room = location.pathname.substring(1);

  const showChat = ref(true);
  const showSettings = ref(false);

  const toggleChat = () => {
    showChat.value = !showChat.value;
  };

  const toggleSettings = () => {
    showSettings.value = !showSettings.value;
  };

  return {
    socket,
    room,
    showChat,
    showSettings,
    toggleChat,
    toggleSettings,
  };
});

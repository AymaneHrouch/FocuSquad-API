import { defineStore } from "pinia";
import { ref} from "vue";

export const useGlobalStore = defineStore("global", () => {
  const showChat = ref(false);
  const showSettings = ref(false);

  const toggleChat = () => {
    showChat.value = !showChat.value;
  };

  const toggleSettings = () => {
    showSettings.value = !showSettings.value;
  };


  return {
    showChat,
    showSettings,
    toggleChat,
    toggleSettings,
  };
});

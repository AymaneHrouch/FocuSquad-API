import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const username = ref(localStorage.getItem("username") || "Someone");
  const quote = ref(
    localStorage.getItem("quote") || "Don't let yesterday take up too much of today."
  );
  const session = ref(localStorage.getItem("session") || 25);
  const shortBreak = ref(localStorage.getItem("shortBreak") || 5);
  const longBreak = ref(localStorage.getItem("longBreak") || 20);

  return {
    username,
    quote,
    session,
    shortBreak,
    longBreak,
  };
});

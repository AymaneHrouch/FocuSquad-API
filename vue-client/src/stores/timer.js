import { defineStore } from "pinia";
import { ref } from "vue";

export const useTimerStore = defineStore("timer", () => {
  const paused = ref(false);
  const stopped = ref(false);
  const resting = ref(true);
  const timerClass = ref(paused.value ? "animate__heartBeat" : "");

  const pause = () => {
    paused.value = true;
    timerClass.value = "";
  };

  const resume = () => {
    paused.value = false;
    timerClass.value = "animate__heartBeat";
  };

  return {
    paused,
    stopped,
    resting,
    timerClass,
    pause,
    resume,
  };
});

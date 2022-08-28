import { defineStore } from "pinia";
import { ref, computed} from "vue";

export const useTimerStore = defineStore("timer", () => {
  const paused = ref(true);
  const stopped = ref(true);
  const resting = ref(true);

  return {
    paused,
    stopped,
    resting,
  };
});

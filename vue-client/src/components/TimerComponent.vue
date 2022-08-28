<template>
  <div id="timer">
    <div class="timer-options not-selectable" v-if="timerStore.stopped">
      <span class="timer-option" @click="startLongBreak"
        >Long Break ({{ settingsStore.longBreak / 60 }}min)</span
      >
      <span class="timer-option" @click="startShortBreak"
        >Short Break ({{ settingsStore.shortBreak / 60 }}min)</span
      >
      <span class="timer-option" @click="startSession"
        >Session ({{ settingsStore.session / 60 }}min)</span
      >
    </div>
    <div class="countdown" v-else>
      <p class="quote">{{ settingsStore.quote }}</p>
      <div class="time animate__animated animate__backInRight not-selectable">
        {{ formatTime(count) }}
      </div>
      <div class="controls not-selectable" v-if="timerStore.paused">
        <span @click="resume">resume</span>
        <span @click="reset">reset</span>
        <span @click="stop">stop</span>
      </div>
      <div class="controls not-selectable" v-else>
        <span @click="pause">pause</span>
      </div>
    </div>
    <div class="users">
      <span class="user" v-for="user in data.users">{{ user.username }}</span>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";

import { useGlobalStore } from "@s/global";
import { useSettingsStore } from "@s/settings";
import { useTimerStore } from "@s/timer";
import { formatTime } from "@/utils/formatTime";

let data = reactive({
  users: [],
});

const count = ref(0);
const tempCount = ref(0);

const startSession = async () => {
  count.value = settingsStore.session;
  timerStore.resting = false;
  if (globalStore.showChat) {
    // Sleep for 1 second to allow the chat to disappear
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  timerStore.stopped = false;
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", {
    room: globalStore.room,
    duration: count.value,
  });
};

const startLongBreak = () => {
  (count.value = settingsStore.longBreak), (timerStore.stopped = false);
  timerStore.resting = true;
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", {
    room: globalStore.room,
    duration: count.value,
  });
};

const startShortBreak = () => {
  count.value = settingsStore.shortBreak;
  timerStore.stopped = false;
  timerStore.resting = true;
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", {
    room: globalStore.room,
    duration: count.value,
  });
};

const pause = () => {
  timerStore.paused = true;
  globalStore.socket.emit("stopCountdown", { room: globalStore.room });
  tempCount.value = count.value;
};

const resume = () => {
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", { room: globalStore.room, duration: count.value });
};

const reset = () => {
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", { room: globalStore.room, duration: 100 });
};

const stop = () => {
  timerStore.stopped = true;
  timerStore.paused = true;
  timerStore.resting = true;
  globalStore.socket.emit("stopCountdown", { room: globalStore.room });
};

const globalStore = useGlobalStore();
const settingsStore = useSettingsStore();
const timerStore = useTimerStore();

onMounted(() => {
  globalStore.socket.on("roomUsers", ({ users: newUsers }) => {
    data.users = newUsers;
  });

  globalStore.socket.on("countdown", (newCount) => {
    count.value = newCount;
    if (count.value === 0) {
      timerStore.stopped = true;
      timerStore.paused = true;
      timerStore.resting = true;
      alert("Time's up!");
    }
  });
});
</script>

<style>
#timer {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s;
  padding: 3rem;
  text-align: center;
}

#timer .time {
  padding-top: 3rem;
  font-size: 4.5rem;
}

#timer .quote {
  font-size: 1rem;
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.controls > * {
  padding: 0.5rem;
  width: 100%;
}

.controls > *:hover {
  cursor: pointer;
  background-color: var(--primary-color);
  color: var(--bg-color);
}

/** Options */
.timer-options {
  display: flex;
  gap: 1rem;
}

.timer-options .timer-option {
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 1.5rem;
}

.timer-options .timer-option:hover {
  background-color: var(--primary-color);
  color: var(--bg-color);
}

/** Users */
/* Tooltip container */
.users {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  max-height: 30vh;
  width: 10rem;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: small;
  text-align: left;
}

.user-icon {
  background-image: url("@/assets/bx-user.svg");
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  height: 0.7rem;
  width: 0.7rem;
}
</style>

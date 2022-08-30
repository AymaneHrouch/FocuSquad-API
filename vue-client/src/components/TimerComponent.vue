<template>
  <div id="timer">
    <div class="timer-options not-selectable" v-if="timerStore.stopped">
      <span class="timer-option" @click="startLongBreak"
        >Long Break ({{ settingsStore.longBreak }}min)</span
      >
      <span class="timer-option" @click="startShortBreak"
        >Short Break ({{ settingsStore.shortBreak }}min)</span
      >
      <span class="timer-option" @click="startSession"
        >Session ({{ settingsStore.session }}min)</span
      >
    </div>
    <div class="countdown" v-else>
      <p class="quote">{{ settingsStore.quote }}</p>
      <div class="time not-selectable">
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
const tempDuration = ref(0);

const rest = ref(false);

const startSession = async () => {
  rest.value = false;

  tempDuration.value = count.value = settingsStore.session * 60;
  globalStore.socket.emit("startCountdown", {
    room: globalStore.room,
    duration: count.value,
    rest: false,
  });

  timerStore.stopped = false;
  timerStore.paused = false;
  timerStore.resting = false;
};

const startLongBreak = () => {
  rest.value = true;
  tempDuration.value = count.value = settingsStore.longBreak * 60;
  timerStore.stopped = false;
  timerStore.resting = true;
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", {
    room: globalStore.room,
    duration: count.value,
    rest: true,
  });
};

const startShortBreak = () => {
  rest.value = true;
  tempDuration.value = count.value = settingsStore.shortBreak * 60;
  timerStore.stopped = false;
  timerStore.resting = true;
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", {
    room: globalStore.room,
    duration: count.value,
    rest: true,
  });
};

const pause = () => {
  timerStore.paused = true;
  globalStore.socket.emit("stopCountdown", {
    room: globalStore.room,
    rest: rest.value,
    paused: true,
  });
  tempCount.value = count.value;
};

const resume = () => {
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", {
    room: globalStore.room,
    duration: count.value,
    rest: rest.value,
  });
};

const reset = () => {
  timerStore.paused = false;
  globalStore.socket.emit("startCountdown", {
    room: globalStore.room,
    duration: tempDuration.value,
    rest: rest.value,
  });
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

  globalStore.socket.on("countdown", ({ count: newCount, rest }) => {
    timerStore.stopped = false;
    timerStore.paused = false;
    timerStore.resting = rest;
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
  /* animation: fadeIn 1s; */
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

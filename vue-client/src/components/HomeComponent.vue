<template>
  <TogglersComponent />
  <SettingsComponent />
  <TimerComponent />
  <ChatComponent />
</template>

<script setup>
import ChatComponent from "./ChatComponent.vue";
import TimerComponent from "./TimerComponent.vue";
import SettingsComponent from "./settingsComponent.vue";
import TogglersComponent from "./TogglersComponent.vue";

import { useGlobalStore } from "@s/global";
import { useSettingsStore } from "@s/settings";
import { useTimerStore } from "@s/timer";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const padTo2Digits = (num) => num.toString().padStart(2, "0");
  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}
</script>

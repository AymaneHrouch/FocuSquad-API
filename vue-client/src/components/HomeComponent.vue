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


</script>

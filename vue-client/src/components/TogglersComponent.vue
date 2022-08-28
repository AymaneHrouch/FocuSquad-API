<template>
  <div id="togglers" v-if="timerStore.resting">
    <span
      @click="globalStore.toggleChat"
      class="chat-icon svg-icon"
      :title="`${globalStore.showChat ? `Hide` : `Show`} Chat`"
    ></span>
    <span
      @click="globalStore.toggleSettings"
      class="settings-icon svg-icon"
      :title="`${globalStore.showSettings ? `Hide` : `Open`} Settings`"
    ></span>
  </div>
</template>

<script setup>
import { useGlobalStore } from "@s/global";
import { useSettingsStore } from "@s/settings";
import { useTimerStore } from "@s/timer";

const globalStore = useGlobalStore();
const settingsStore = useSettingsStore();
const timerStore = useTimerStore();
</script>

<style>
#togglers {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 1rem;
  gap: 1rem;
}

.chat-icon {
  background-image: url("@/assets/bx-chat.svg");
}

.settings-icon {
  background-image: url("@/assets/bxs-cog.svg");
  top: 5rem;
}

.chat-icon {
  z-index: 1;
}

.settings-icon {
  z-index: 4;
}

.chat-icon,
.settings-icon {
  padding: 1rem;
  height: 3rem;
  width: 3rem;
  box-shadow: #000 0px 0px 5px 1px;
  cursor: pointer;
  border-radius: 50%;
  background-color: var(--secondary-color);
  opacity: 0.7;
}
</style>

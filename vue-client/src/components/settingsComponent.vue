<template>
  <Transition name="settings">
    <div class="modal-wraper" v-if="globalStore.showSettings">
      <div class="settings-modal">
        <span class="close-btn" @click="globalStore.showSettings = false">&times;</span>
        <h2 class="modal-heading">Settings</h2>
        <div class="setting-option">
          <label for="long-break">Username</label>
          <input type="text" id="username-input" />
        </div>

        <div class="setting-option">
          <label for="long-break">Quote</label>
          <input type="text" id="username-input" v-model="settingsStore.quote" />
        </div>

        <div class="setting-option">
          <label for="long-break">Session</label>
          <input type="number" id="session-input" min="1" max="120" />
        </div>

        <div class="setting-option">
          <label for="long-break">Short Break</label>
          <input type="number" id="short-break-input" min="1" max="120" />
        </div>

        <div class="setting-option">
          <label for="long-break">Long Break</label>
          <input type="number" id="long-break-input" min="1" max="120" />
        </div>
        <span class="ok-btn not-selectable">OK</span>
      </div>
    </div>
  </Transition>
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
/** Settings modal animation */
.settings-enter-active {
  animation: bounceIn 0.5s;
}

.settings-leave-active {
  animation: bounceOut 0.5s;
}

/** Settings Modal */
.modal-heading {
  padding: 1rem 0;
}

.modal-wraper {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings-modal {
  background-color: var(--primary-color);
  position: absolute;
  /* top: 50%;
    left: 50%;
    transform: translate(-50
    width: 20rem;
    border-radius: 0.5rem;%, -50%) !important; */
  height: auto;
  width: 20rem;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #000;
  border: solid #000 2px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 60px 1px;
}

.setting-option {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
}

.setting-option input {
  background-color: var(--input-color);
  padding: 0.5rem;
}

.close-btn {
  float: right;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.3rem;
}

.ok-btn {
  color: var(--bg-color);
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  float: right;
  margin-top: 3rem;
}
.ok-btn:hover {
  background-color: #be5ed4;
}
</style>

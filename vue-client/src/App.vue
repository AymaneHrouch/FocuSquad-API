<template>
  <TogglersComponent />
  <SettingsComponent />
  <TimerComponent />
  <ChatComponent />
</template>

<script setup>
import ChatComponent from "@c/ChatComponent.vue";
import TimerComponent from "@c/TimerComponent.vue";
import SettingsComponent from "@c/settingsComponent.vue";
import TogglersComponent from "@c/TogglersComponent.vue";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const padTo2Digits = (num) => num.toString().padStart(2, "0");
  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;700&display=swap");

:root {
  --bg-color: #5a19d3;
  --text-color: #dadada;
  --primary-color: #d18ce0;
  --secondary-color: #eeeeee;
  --input-color: #e7c2ef;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

input:focus {
  outline: none;
}

input {
  border: none;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: "Anek Telugu", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  letter-spacing: 1px;
}

#app {
  display: flex;
  height: 100%;
  width: 100%;
}

.svg-icon {
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
}

.not-selectable {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

@media only screen and (max-width: 900px) {
  #chat {
    width: 100%;
    position: absolute;
    right: 0;
    background: rgb(0, 0, 0, 0.3);
  }

  #timer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    padding-top: 9rem;
  }

  .users {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .timer-options {
    flex-direction: column;
  }

  .timer-options .timer-option,
  .controls > * {
    width: 100vw;
  }

  .modal-wraper {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .chat-icon,
  .settings-icon {
    height: 1rem;
    width: 1rem;
  }

  .quote {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }
}
</style>

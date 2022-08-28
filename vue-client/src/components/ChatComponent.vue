<template>
  <Transition name="chat">
    <div id="chat" v-if="globalStore.showChat && timerStore.resting">
      <main class="chat-main">
        <div
          :class="`message message-${message.username ? `incoming` : `outgoing`}`"
          v-for="message in messages"
        >
          <div class="message-sender" v-if="message.username">{{ message.username }}</div>
          <p class="message-text" :title="message.time"></p>
          <p v-for="paragraph in message.text.split(`\n`)">
            {{ paragraph }}
          </p>
        </div>
      </main>
      <div class="chat-form-container">
        <form name="chatForm" id="chat-form" @submit="handleSubmit">
          <input ref="messageInput" id="msg" type="text" placeholder="Aa" required autocomplete="off" />
          <span id="submit-btn" class="svg-icon" @click="handleSubmit"></span>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";

import { useGlobalStore } from "@s/global";
import { useSettingsStore } from "@s/settings";
import { useTimerStore } from "@s/timer";

const globalStore = useGlobalStore();
const settingsStore = useSettingsStore();
const timerStore = useTimerStore();

const messageInput = ref(null);

let messages = reactive([]);

const handleSubmit = (e) => {
  if (e) e.preventDefault();
  let time = new Date().toLocaleTimeString();

  // Append the message to the messages array
  time = time.split(":").splice(0, 2).join(":") + " " + time.split(" ")[1].toLowerCase();
  messages.push({
    text: messageInput.value.value,
    time,
  });

  // Send message to server
  globalStore.socket.emit("chatMessage", messageInput.value.value);

  // Clear the input field
  messageInput.value.value = "";
};

onMounted(() => {
  globalStore.socket.emit("joinRoom", {
    username: settingsStore.username,
    room: globalStore.room,
  });

  globalStore.socket.on("message", (msg) => {
    messages.push(msg);
  });
});
</script>

<style>
#chat {
  /* background-color: red; */
  padding-top: 1rem;
  width: 40%;
  height: 100%;
  font-family: "Hind Siliguri", sans-serif;
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0px;
  color: #000;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-main {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
}

/** Scrollbar */

*::-webkit-scrollbar,
*::-webkit-scrollbar-thumb {
  width: 26px;
  border-radius: 13px;
  background-clip: padding-box;
  border: 10px solid transparent;
}

*::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 0 10px #00000068;
}

/** Messages */

.message {
  width: 70%;
  background-color: green;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.7rem;
  border-radius: 0.5rem;
}

.message-outgoing {
  align-self: flex-end;
  background-color: var(--primary-color);
}

.message-incoming {
  background-color: var(--secondary-color);
}

.message-sender {
  margin-bottom: 0.3rem;
}

.message-sender {
  font-weight: bold;
}

#msg {
  flex: 1;
  border-radius: 0.5rem;
  border: none;
  background-color: #ddd;
  height: 2rem;
  padding: 0.4rem;
}

/** Chat Form */
.chat-form-container {
  padding: 1rem;
  width: 100%;
  overflow: hidden;
  background: transparent;
  border: none;
  background-color: var(--bg-color);
}

#chat-form {
  display: flex;
  width: 100%;
}

#submit-btn {
  height: 2rem;
  background-image: url("@/assets/bxs-send.svg");
  width: 2rem;
  padding: 1.1rem;
  cursor: pointer;
}

/** Chat animation */
.chat-enter-active {
  animation: bounceInRight 1s;
}

.chat-leave-active {
  animation: bounceOutRight 1s;
}
</style>

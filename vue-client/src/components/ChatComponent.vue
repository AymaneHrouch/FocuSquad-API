<template>
  <Transition name="chat">
    <div id="chat" v-if="globalStore.showChat && timerStore.resting">
      <main class="chat-main">
        <div class="message message-incoming">
          <div class="message-sender">Aymane</div>
          <p class="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repudiandae expedita
            dicta commodi rerum nam veniam recusandae magni dolorem doloremque. Error, quam
            necessitatibus, alias eius ex recusandae exercitationem at quaerat quos vitae
            voluptatem!
          </p>
        </div>

        <div class="message message-outgoing">
          <p class="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repudiandae expedita
            dicta commodi rerum nam veniam recusandae magni dolorem doloremque. Error, quam
            necessitatibus, alias eius ex recusandae exercitationem at quaerat quos vitae
            voluptatem!
          </p>
        </div>

        <div class="message message-outgoing">
          <p class="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repudiandae expedita
            dicta commodi rerum nam veniam recusandae magni dolorem doloremque. Error, quam
            necessitatibus, alias eius ex recusandae exercitationem at quaerat quos vitae
            voluptatem!
          </p>
        </div>

        <div class="message message-outgoing">
          <p class="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repudiandae expedita
            dicta commodi rerum nam veniam recusandae magni dolorem doloremque. Error, quam
            necessitatibus, alias eius ex recusandae exercitationem at quaerat quos vitae
            voluptatem!
          </p>
        </div>

        <div class="message message-outgoing">
          <p class="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repudiandae expedita
            dicta commodi rerum nam veniam recusandae magni dolorem doloremque. Error, quam
            necessitatibus, alias eius ex recusandae exercitationem at quaerat quos vitae
            voluptatem!
          </p>
        </div>

        <div class="message message-outgoing">
          <p class="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repudiandae expedita
            dicta commodi rerum nam veniam recusandae magni dolorem doloremque. Error, quam
            necessitatibus, alias eius ex recusandae exercitationem at quaerat quos vitae
            voluptatem!
          </p>
        </div>

        <div class="message message-outgoing">
          <p class="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repudiandae expedita
            dicta commodi rerum nam veniam recusandae magni dolorem doloremque. Error, quam
            necessitatibus, alias eius ex recusandae exercitationem at quaerat quos vitae
            voluptatem!
          </p>
        </div>
      </main>
      <div class="chat-form-container">
        <form ref="chatForm" name="chatForm" id="chat-form">
          <input id="msg" type="text" placeholder="Aa" required autocomplete="off" />
          <span id="submit-btn" class="svg-icon"></span>
        </form>
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
#chat {
  /* background-color: red; */
  width: 40%;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  font-family: "Hind Siliguri", sans-serif;
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0px;
  color: #000;
  float: right;
}

.chat-main {
  padding: 0 1rem;
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
  float: right;
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
  position: sticky;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background: transparent;
  border: none;
  background-color: var(--bg-color);
}

#chat-form {
  display: flex;
  width: 100%;
  gap: 10px;
}

#submit-btn {
  height: 2rem;
  padding: 0.4rem;
  background-image: url("@/assets/bxs-send.svg");
  width: 2rem;
}

/** Chat animation */
.chat-enter-active {
  animation: bounceInRight 1s;
}

.chat-leave-active {
  animation: bounceOutRight 1s;
}
</style>

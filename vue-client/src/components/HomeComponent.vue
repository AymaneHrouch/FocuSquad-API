<template>
  <div id="config" v-if="resting">
    <span
      @click="toggleChat"
      class="chat-icon"
      :title="`${showChat ? `Hide` : `Show`} Chat`"
    ></span>
    <span
      @click="toggleSettings"
      class="settings-icon"
      :title="`${showSettings ? `Hide` : `Open`} Settings`"
    ></span>
  </div>
  <Transition name="settings">
    <div class="modal-wraper" v-if="showSettings">
      <div class="settings-modal">
        <span class="close-btn" @click="showSettings = false">&times;</span>
        <h2 class="modal-heading">Settings</h2>
        <div class="setting-option">
          <label for="long-break">Username</label>
          <input type="text" id="username-input" />
        </div>

        <div class="setting-option">
          <label for="long-break">Quote</label>
          <input type="text" id="username-input" />
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
        <span class="btn">OK</span>
      </div>
    </div>
  </Transition>
  <div id="timer">
    <div class="timer-options" v-if="stopped">
      <span class="timer-option">Long Break (20min)</span>
      <span class="timer-option">Short Break (10min)</span>
      <span class="timer-option" @click="stopped = false; resting = false;">Session (120min)</span>
    </div>
    <div class="countdown" v-else>
      <p class="quote">Don't let yesterday take up too much of today.</p>
      <div class="time animate__animated" :class="myClass">28:16</div>
      <div class="controls" v-if="paused">
        <span @click="resume">resume</span>
        <span>reset</span>
        <span @click="stopped = true; resting = true">stop</span>
      </div>
      <div class="controls" v-else>
        <span @click="pause">pause</span>
      </div>
    </div>
    <div class="users">
      <span class="user">aymane</span>
      <span class="user">aymane</span>
      <span class="user">aymane</span>
    </div>
  </div>
  <Transition name="chat">
    <div id="chat" v-if="showChat && resting">
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
          <span id="submit-btn" @click="sendMessage"></span>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "HomeComponent",
  setup() {
    
  },
  data() {
    return {
      value: 15,
      paused: true,
      stopped: false,
      myClass: !this.paused ? "animate__heartBeat" : "",
      showChat: false,
      showSettings: true,
      resting: true,
    };
  },
  mounted() {
    // this.$refs.chatForm.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   this.sendMessage();
    // });

    const totalSeconds = 122;
    console.log(this.formatTime(totalSeconds));
  },
  methods: {
    pause() {
      this.paused = true;
      this.myClass = "";
    },
    resume() {
      this.paused = false;
      this.myClass = "animate__heartBeat";
    },
    submit() {},
    sendMessage() {
      console.log("send message");
    },
    toggleChat() {
      this.showChat = !this.showChat;
    },
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    formatTime(totalSeconds) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const padTo2Digits = (num) => num.toString().padStart(2, "0");
      return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    },
  },
};
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

#app {
  display: flex;
  height: 100%;
  width: 100%;
}

.chat-enter-active {
  animation: bounceInRight 1s;
}

.chat-leave-active {
  animation: bounceOutRight 1s;
}

.settings-enter-active {
  animation: bounceIn 0.5s;
}

.settings-leave-active {
  animation: bounceOut 0.5s;
}

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

/**
Scrollbar
*/

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

#msg {
  flex: 1;
  border-radius: 0.5rem;
  border: none;
  background-color: #ddd;
}

#msg,
#submit-btn {
  height: 2rem;
  padding: 0.4rem;
}

#submit-btn {
  background-image: url("../assets/bxs-send.svg");
  width: 2rem;
}

.chat-icon {
  background-image: url("../assets/bx-chat.svg");
}

.settings-icon {
  background-image: url("../assets/bxs-cog.svg");
  top: 5rem;
}

#config {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 1rem;
  gap: 1rem;
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

#submit-btn,
.chat-icon,
.settings-icon {
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
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
  background-image: url("../assets/bx-user.svg");
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  height: 0.7rem;
  width: 0.7rem;
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

.timer-options,
.users,
.btn,
.controls,
.time,
.quote {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

.close-btn {
  float: right;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.3rem;
}

.btn {
  color: var(--bg-color);
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  float: right;
  margin-top: 3rem;
}

.btn:hover {
  background-color: #be5ed4;
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
}
</style>

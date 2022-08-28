<template>
  <h1>Hello World HRU</h1>
</template>

<script>
export default {
  name: "TimerComponent",
  data() {
    return {
      room: location.pathname.substring(1),
      count: 0,
      duration: 60,
      username: new URLSearchParams(location.search).get("username"),
    };
  },
  mounted() {
    const { $socket, room, username, count } = this;
    console.log("room", room);
    console.log("username", username);
    $socket.emit("joinRoom", { username: username, room: room });
    $socket.on("countdown", (c) => {
      count = c;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

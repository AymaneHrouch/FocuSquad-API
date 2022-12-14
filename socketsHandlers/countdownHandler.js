const {
  startCountdown,
  pauseCountdown,
  resumeCountdown,
  resetCountdown,
  stopCountdown,
} = require("../utils/countdowns");

module.exports = function (io, socket) {
  // Start countdown / session or break
  socket.on("countdown:start", async ({ duration, isRest }) => {
    const room = [...socket.rooms.values()][1];
    if (!room) return console.log("No room found");
    await startCountdown(io, room, duration, isRest);
  });

  // Pause countdown
  socket.on("countdown:pause", async ({ timeLeft }) => {
    const room = [...socket.rooms.values()][1];
    await pauseCountdown(room, timeLeft);
    // Notify all users in the room that the countdown has been paused
    io.to(room).emit("countdown:paused");
  });

  // Resume countdown
  socket.on("countdown:resume", async () => {
    const room = [...socket.rooms.values()][1];
    await resumeCountdown(io, room);
  });

  // Reset countdown
  socket.on("countdown:reset", async () => {
    const room = [...socket.rooms.values()][1];
    await resetCountdown(io, room);
  });

  // Stop countdown
  socket.on("countdown:stop", async () => {
    const room = [...socket.rooms.values()][1];
    await stopCountdown(room);
    // Notify all users in the room that the countdown has been paused
    io.to(room).emit("countdown:stopped");
  });
};

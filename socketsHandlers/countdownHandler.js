const { getCurrentUser } = require('../utils/users');
const {
  startCountdown,
  pauseCountdown,
  resumeCountdown,
  resetCountdown,
  stopCountdown,
} = require('../utils/countdowns');

module.exports = function (io, socket) {
  // Start countdown / session or break
  socket.on('countdown:start', ({ duration, isRest }) => {
    const room = [...socket.rooms.values()][1];
    if(!room) return console.log('No room found');
    startCountdown(io, room, duration, isRest);
  });

  // Pause countdown
  socket.on('countdown:pause', ({ timeLeft }) => {
    const room = [...socket.rooms.values()][1];
    pauseCountdown(room, timeLeft);
    // Notify all users in the room that the countdown has been paused
    io.to(room).emit('countdown:paused');
  });

  // Resume countdown
  socket.on('countdown:resume', () => {
    const room = [...socket.rooms.values()][1];
    resumeCountdown(io, room);
  });

  // Reset countdown
  socket.on('countdown:reset', () => {
    const room = [...socket.rooms.values()][1];
    resetCountdown(io, room);
  });

  // Stop countdown
  socket.on('countdown:stop', () => {
    const room = [...socket.rooms.values()][1];
    stopCountdown(room);
    // Notify all users in the room that the countdown has been paused
    io.to(room).emit('countdown:stopped');
  });
};

const countdowns = [];

function getCountdown(room) {
  return countdowns.find(countdown => countdown.room === room);
}

function startCountdown(io, room, duration) {
  let count = duration;
  interval = setInterval(() => {
    io.to(room).emit("countdown", count);
    count--;

    if (count < 0) {
      stopCountdown(room);
    }
  }, 1000);
  countdowns.push({ room, interval });
}

function stopCountdown(room) {
  const countdown = getCountdown(room);
  if (!countdown) return console.log("Countdown not found");
  const index = countdowns.findIndex(c => c.room === room);
  if (index !== -1) {
    countdowns.splice(index, 1)[0];
    clearInterval(countdown.interval);
  }
}

module.exports = {
  startCountdown,
  stopCountdown,
};

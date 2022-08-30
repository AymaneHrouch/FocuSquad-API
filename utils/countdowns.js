const countdowns = [];

function getCountdown(room) {
  return countdowns.find((countdown) => countdown.room === room);
}

function getCountdownIndex(room) {
  return countdowns.findIndex((countdown) => countdown.room === room);
}

function isActive(room) {
  const countdown = countdowns.find((countdown) => countdown.room === room);
  console.log(countdown);
  return countdown ? true : false;
}

function startCountdown(io, room, duration, rest) {
  let count = duration - 1;
  // Check if countdown of this room is already active
  if (isActive(room)) return console.log("Countdown already active");

  // Create new countdown
  countdowns.push({ room });

  console.log("ok i will start the countdown");
  interval = setInterval(() => {
    io.to(room).emit("countdown", { count, rest });
    count--;

    if (count < 0) {
      stopCountdown(room);
    }
    // Save the countdown in the array
  }, 1000);
  const index = getCountdownIndex(room);
  countdowns[index].interval = interval;
}

function stopCountdown(room) {
  const countdown = getCountdown(room);
  const index = getCountdownIndex(room);
  if (index !== -1) {
    countdowns.splice(index, 1)[0];
    clearInterval(countdown.interval);
  }
}

module.exports = {
  startCountdown,
  stopCountdown,
};

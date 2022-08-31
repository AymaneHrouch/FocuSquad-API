const countdowns = [];

function getCountdown(room) {
  return countdowns.find((countdown) => countdown.room === room);
}

function getCountdownIndex(room) {
  return countdowns.findIndex((countdown) => countdown.room === room);
}

function getCountdownState(room) {
  const countdownIndex = getCountdownIndex(room);
  if (countdownIndex === -1) return 'stopped';
  return countdowns[countdownIndex].state;
}

function isActive(room) {
  const countdown = countdowns.find((countdown) => countdown.room === room);
  return countdown ? true : false;
}

function sendHeartBeats(io, room, duration, isRest) {
  let count = duration;
  interval = setInterval(() => {
    // Todo: send isRest only once when new user is connected
    io.to(room).emit('countdown:update', { count, rest: isRest });
    console.log(`${count} to ${room}`);
    count--;

    if (count < 0) {
      stopCountdown(room);
    }
  }, 1000);
  return interval;
}

function startCountdown(io, room, duration, isRest) {
  let count = duration - 1;
  // Check if countdown of this room is already active
  if (isActive(room)) return console.log('Countdown already active');

  // Create new countdown
  countdowns.push({ room, isRest, duration });

  // Update countdown every second
  const interval = sendHeartBeats(io, room, count, isRest);

  // Save the countdown in the array
  const index = getCountdownIndex(room);
  countdowns[index].interval = interval;
}

function pauseCountdown(room, timeLeft) {
  const index = getCountdownIndex(room);
  if (index === -1) return console.log("Countdown doesn't exist");
  countdowns[index].timeLeft = timeLeft;
  countdowns[index].state = 'paused';
  clearInterval(countdowns[index].interval);
}

function resumeCountdown(io, room) {
  const index = getCountdownIndex(room);
  if (index === -1) return console.log("Countdown doesn't exist");
  if (countdowns[index].state === 'paused') {
    countdowns[index].state = 'active';
    const interval = sendHeartBeats(io, room, countdowns[index].timeLeft, countdowns[index].isRest);
    countdowns[index].interval = interval;
  }
}

function resetCountdown(io, room) {
  const index = getCountdownIndex(room);
  if (index === -1) return console.log("Countdown doesn't exist");
  if (countdowns[index].state === 'paused') {
    countdowns[index].state = 'active';
    const interval = sendHeartBeats(io, room, countdowns[index].duration, countdowns[index].isRest);
    countdowns[index].interval = interval;
  }
}

function stopCountdown(room) {
  const index = getCountdownIndex(room);
  if (index !== -1) {
    clearInterval(countdowns[index].interval);
    countdowns.splice(index, 1)[0];
  }
}

module.exports = {
  startCountdown,
  pauseCountdown,
  resumeCountdown,
  resetCountdown,
  stopCountdown,
  getCountdownState,
};

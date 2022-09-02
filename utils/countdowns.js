const redisClient = require("../startup/redis");

async function getCountdownState(room) {
  const state = await redisClient.hGet(`countdown:${room}`, "state");
  return state || "stopped";
}

function isActive(room) {
  const state = redisClient.hGet(`countdown:${room}`, "state");
  return state === "active";
}

function sendHeartBeats(io, room, duration, isRest) {
  let count = duration;
  interval = setInterval(() => {
    // Todo: send isRest only once when new user is connected
    io.to(room).emit("countdown:update", { count, rest: isRest === "1" });
    console.log(`${count} to ${room}`);
    count--;

    if (count < 0) {
      stopCountdown(room);
    }
  }, 1000);
  return interval;
}

async function startCountdown(io, room, duration, isRest) {
  // minus one just to make the app smoother
  let count = duration - 1;

  // Check if countdown of this room is already active
  if (isActive(room)) return console.log("Countdown already active");

  // Create new countdown
  await redisClient.hSet(`countdown:${room}`, "state", "active");
  await redisClient.hSet(`countdown:${room}`, "isRest", isRest ? 1 : 0);
  await redisClient.hSet(`countdown:${room}`, "duration", duration);
  redisClient.expire(`countdown:${room}`, 86400);

  // Update countdown every second
  const interval = sendHeartBeats(io, room, count, isRest);

  // Save the countdown in the array
  redisClient.hSet(`countdown:${room}`, "interval", parseInt(interval));
}

async function pauseCountdown(room, timeLeft) {
  await redisClient.hSet(`countdown:${room}`, "timeLeft", timeLeft);
  await redisClient.hSet(`countdown:${room}`, "state", "paused");
  const interval = await redisClient.hGet(`countdown:${room}`, "interval");
  clearInterval(interval);
}

async function resumeCountdown(io, room) {
  const state = await redisClient.hGet(`countdown:${room}`, "state");
  if (state === "paused") {
    await redisClient.hSet(`countdown:${room}`, "state", "active");
    const timeLeft = await redisClient.hGet(`countdown:${room}`, "timeLeft");
    const isRest = await redisClient.hGet(`countdown:${room}`, "isRest");
    const interval = sendHeartBeats(io, room, timeLeft, isRest);
    await redisClient.hSet(`countdown:${room}`, "interval", parseInt(interval));
  }
}

async function resetCountdown(io, room) {
  const state = await redisClient.hGet(`countdown:${room}`, "state");
  if (state === "paused") {
    await redisClient.hSet(`countdown:${room}`, "state", "active");
    const duration = await redisClient.hGet(`countdown:${room}`, "duration");
    const isRest = await redisClient.hGet(`countdown:${room}`, "isRest");
    const interval = sendHeartBeats(io, room, duration, isRest);
    await redisClient.hSet(`countdown:${room}`, "interval", parseInt(interval));
  }
}

async function stopCountdown(room) {
  const interval = await redisClient.hGet(`countdown:${room}`, "interval");
  if (interval) {
    clearInterval(interval);
    redisClient.del(`countdown:${room}`);
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

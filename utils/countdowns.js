// Debugger
const countdownDebugger = require("debug")("app:countdown");

const redisClient = require("../startup/redis");

async function getCountdownState(room) {
  const state = await redisClient.hGet(`countdown:${room}`, "state");
  return state || "stopped";
}

async function isActive(room) {
  const state = await redisClient.hGet(`countdown:${room}`, "state");
  return state === "active";
}

/**
 * 
 * @param {*} io 
 * @param {*} room 
 * @param {*} duration 
 * @param {string} isRest 
 * @returns 
 */
function sendHeartBeats(io, room, duration, isRest) {
  let count = duration;
  const rest = isRest === "true" ? true : false;
  interval = setInterval(() => {
    // Todo: send isRest only once when new user is connected
    io.to(room).emit("countdown:update", { count, rest });
    countdownDebugger(`${count} to ${room}, isRest=${isRest}`);
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
  if (await isActive(room)) return console.log("Countdown already active");

  // Create new countdown
  await redisClient.hSet(`countdown:${room}`, "state", "active");
  await redisClient.hSet(`countdown:${room}`, "isRest", String(isRest));
  await redisClient.hSet(`countdown:${room}`, "duration", duration);
  redisClient.expire(`countdown:${room}`, 86400);

  // Update countdown every second
  const interval = sendHeartBeats(io, room, count, String(isRest));

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

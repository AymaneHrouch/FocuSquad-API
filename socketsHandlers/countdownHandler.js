const { getCurrentUser } = require("../utils/users");
const { startCountdown, stopCountdown } = require("../utils/countdowns");
module.exports = function (io, socket) {
  // Start countdown
  socket.on("startCountdown", ({ room, duration }) => {
    startCountdown(io, room, duration);
  });

  // Stop countdown
  socket.on("stopCountdown", () => {
    const user = getCurrentUser(socket.id);
    if (!user) return console.log("User not found");
    stopCountdown(user.room);
  });
};

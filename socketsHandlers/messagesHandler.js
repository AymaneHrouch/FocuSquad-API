const { getCurrentUser } = require("../utils/users");
const { formatMessage } = require("../utils/messages");

module.exports = function (io, socket) {
  socket.on("chatMessage", async (msg) => {
    const user = await getCurrentUser(socket.id);
    if (user) socket.broadcast.to(user.room).emit("message", formatMessage(user.username, msg));
  });
};

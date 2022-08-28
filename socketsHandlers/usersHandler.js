const { formatMessage } = require("../utils/messages");
const { userJoin, getRoomUsers, userLeave, renameUser, getCurrentUser } = require("../utils/users");

module.exports = function (io, socket) {
  const sendRoomUsers = (user) => {
    io.to(user.room).emit("roomUsers", {
      users: getRoomUsers(user.room),
    });
  };

  // User joins room
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(room);
    console.log(`${username} has joined ${room}`);

    // Send users and room info
    sendRoomUsers(user);

    // Send welcome message
    io.to(user.room).emit("message", formatMessage("🥰", `${user.username} has joined the chat`));

    // Update settings
    socket.on("settings", ({ username, session, shortBreak, longBreak }) => {
      renameUser(io, socket.id, username);
      const user = getCurrentUser(socket.id);
      sendRoomUsers(user);
      if (session || shortBreak || longBreak) {
        io.to(user.room).emit("roomSettings", {
          session,
          shortBreak,
          longBreak,
        });

        io.to(user.room).emit(
          "message",
          formatMessage(
            "🥰",
            `(${user.username}) has updated the settings:
          ${session ? `*Session: ${session} minutes\n` : ""}
          ${shortBreak ? `*Short Break: ${shortBreak} minutes\n` : ""}
          ${longBreak ? `*Long Break: ${longBreak} minutes\n` : ""}`
          )
        );
      }
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        sendRoomUsers(user);
      }
    });
  });
};

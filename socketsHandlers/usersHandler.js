const { formatMessage } = require("../utils/messages");
const { userJoin, getRoomUsers, userLeave, renameUser, getCurrentUser } = require("../utils/users");
const { getCountdownState } = require("../utils/countdowns");

module.exports = function (io, socket) {
  const sendRoomUsers = async (user) => {
    io.to(user.room).emit("roomUsers", {
      users: await getRoomUsers(io, user.room),
    });
  };

  // User joins room
  socket.on("joinRoom", async ({ username, room }) => {
    const user = await userJoin(socket.id, username, room);
    socket.join(room);
    console.log(`${username} has joined ${room}`);

    // The user requests current settings
    socket.broadcast.to(user.room).emit("settings:req");

    // Send the user the current state of the countdown
    socket.to(socket.id).emit("countdown:state", await getCountdownState(user.room));

    // Send users and room info
    sendRoomUsers(user);

    // Notify all users in the room that a new user has joined
    io.to(user.room).emit("message", formatMessage("info", `${user.username} has joined the chat`));

    // When the server gets the current/new settings, we send them to all users in the room
    socket.on("settings:res", async ({ username, session, shortBreak, longBreak, sync }) => {
      if (username) await renameUser(io, socket.id, username);
      const user = await getCurrentUser(socket.id);
      sendRoomUsers(user);
      if (session || shortBreak || longBreak) {
        io.to(user.room).emit("settings:update", {
          session,
          shortBreak,
          longBreak,
        });

        /**
         * If the change was made through the settings component,
         * We notify all users in the room
         *
         * Otherwise if the server is just syncing the settings,
         * we don't notify the users
         */
        if (!sync) {
          io.to(user.room).emit(
            "message",
            formatMessage(
              "info",
              `(${user.username}) has updated the settings:
            ${session ? `*Session: ${session} minutes\n` : ""}
            ${shortBreak ? `*Short Break: ${shortBreak} minutes\n` : ""}
            ${longBreak ? `*Long Break: ${longBreak} minutes\n` : ""}`
            )
          );
        }
      }
    });

    socket.on("disconnect", async () => {
      const user = await userLeave(socket.id);
      if (user) {
        sendRoomUsers(user);
      }
    });
  });
};

const { userJoin, getRoomUsers, userLeave } = require("../utils/users");

module.exports = function (io, socket) {
  // User joins room
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(room);
    console.log(`${username} has joined ${room}`);

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      users: getRoomUsers(user.room),
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit("roomUsers", {
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};

const { formatMessage } = require('../utils/messages');
const { userJoin, getRoomUsers, userLeave, renameUser, getCurrentUser } = require('../utils/users');

module.exports = function (io, socket) {
  const sendRoomUsers = (user) => {
    io.to(user.room).emit('roomUsers', {
      users: getRoomUsers(user.room),
    });
  };

  // User joins room
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(room);
    console.log(`${username} has joined ${room}`);

    // The user requests current settings
    socket.broadcast.to(user.room).emit('settings:req');

    // Send users and room info
    sendRoomUsers(user);

    // Notify all users in the room that a new user has joined
    io.to(user.room).emit('message', formatMessage('🥰', `${user.username} has joined the chat`));

    // When the server gets the current/new settings, we send them to all users in the room
    socket.on('settings:res', ({ username, session, shortBreak, longBreak, sync }) => {
      if (username) renameUser(io, socket.id, username);
      const user = getCurrentUser(socket.id);
      sendRoomUsers(user);
      if (session || shortBreak || longBreak) {
        io.to(user.room).emit('settings:update', {
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
            'message',
            formatMessage(
              '🥰',
              `(${user.username}) has updated the settings:
            ${session ? `*Session: ${session} minutes\n` : ''}
            ${shortBreak ? `*Short Break: ${shortBreak} minutes\n` : ''}
            ${longBreak ? `*Long Break: ${longBreak} minutes\n` : ''}`
            )
          );
        }
      }
    });

    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
      if (user) {
        sendRoomUsers(user);
      }
    });
  });
};

const { formatMessage } = require("../utils/messages");

const users = [];

// Get All users
const getUsers = () => {
  return users;
};

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// Rename current user
function renameUser(io, id, username) {
  const user = getCurrentUser(id);
  const oldUsername = user.username
  if (user.username !== username) {
    user.username = username;
    io.to(user.room).emit(
      "message",
      formatMessage("🥰", `(${oldUsername})has changed their name to (${username})`)
    );
  }
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  renameUser,
  userLeave,
  getRoomUsers,
  getUsers,
};

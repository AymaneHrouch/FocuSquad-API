const { formatMessage } = require("../utils/messages");
const redisClient = require("../startup/redis");

// Join user to chat
async function userJoin(id, username, room) {
  const user = { id, username, room };
  await redisClient.hSet(`user:${id}`, "username", username);
  await redisClient.hSet(`user:${id}`, "room", room);
  await redisClient.sAdd(`room:${room}`, id);
  redisClient.expire(`user:${id}`, 86400);
  redisClient.expire(`room:${room}`, 86400);
  return user;
}

// Get current user
async function getCurrentUser(id) {
  const user = await redisClient.hGetAll(`user:${id}`);
  return user;
}

// Rename current user
function renameUser(io, id, username) {
  const user = getCurrentUser(id);
  const oldUsername = user.username;
  if (user.username !== username) {
    user.username = username;
    io.to(user.room).emit(
      "message",
      formatMessage("🥰", `(${oldUsername}) has changed their name to (${username})`)
    );
  }
}

// User leaves chat
function userLeave(id) {
  // No need to await here
  redisClient.del(`user:${id}`);
}

// Get room users
async function getRoomUsers(room) {
  const usersIds = await redisClient.sMembers(`room:${room}`);
  // Promise.all is used to wait for all the promises to resolve
  const usernames = await Promise.all(
    usersIds.map(async (id) => await redisClient.hGet(`user:${id}`, "username"))
  );
  return usernames;
}

module.exports = {
  userJoin,
  getCurrentUser,
  renameUser,
  userLeave,
  getRoomUsers,
};

const { formatMessage } = require("../utils/messages");
const redisClient = require("../startup/redis");

// Join user to chat
async function userJoin(id, username, room) {
  const user = { id, username, room };
  await redisClient.hSet(`user:${id}`, "username", username);
  await redisClient.hSet(`user:${id}`, "room", room);
  redisClient.expire(`user:${id}`, 86400);
  return user;
}

// Get current user
async function getCurrentUser(id) {
  const user = await redisClient.hGetAll(`user:${id}`);
  return user;
}

// Rename current user
async function renameUser(io, id, username) {
  const user = await getCurrentUser(id);
  const oldUsername = user.username;
  if (user.username !== username) {
    await redisClient.hSet(`user:${id}`, "username", username);
    io.to(user.room).emit(
      "message",
      formatMessage("info", `(${oldUsername}) has changed their name to (${username})`)
    );
  }
}

// User leaves chat
async function userLeave(id) {
  const user = await getCurrentUser(id);
  redisClient.del(`user:${id}`);
  return user;
}

// Get room users
async function getRoomUsers(io, room) {
  // Get all users in the room
  const usersIds = (await io.in(room).fetchSockets()).map((socket) => socket.id);
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

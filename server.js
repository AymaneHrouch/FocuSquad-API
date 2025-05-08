const http = require("http");

const express = require("express");
const socketio = require("socket.io");

require('dotenv').config();

const redisClient = require("./startup/redis");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect to Redis
redisClient.connect();

// sockets handlers
const countdownHandler = require("./socketsHandlers/countdownHandler");
const usersHandler = require("./socketsHandlers/usersHandler");
const messagesHandler = require("./socketsHandlers/messagesHandler");

const onConnection = (socket) => {
  console.log("new connection");

  // Tell the frontend that the server is running
  socket.on("ping", () => {
    io.to(socket.id).emit("pong");
  });

  usersHandler(io, socket);
  countdownHandler(io, socket);
  messagesHandler(io, socket);
};

io.on("connection", onConnection);

// Server listening
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the server</h1>");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening at ${PORT}...`));
